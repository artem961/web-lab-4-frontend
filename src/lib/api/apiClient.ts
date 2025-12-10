import type {
    CheckResult, Dot, FetchResult,
    AuthUserData, AuthResult, RegisterUserData,
    ApiError
} from "./interfaces";

class ApiClient {
    private baseUrl = "/api";

    public async fetchApi<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<FetchResult<T>> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers = this.prepareHeaders(options.headers);

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            return await this.handleResponse<T>(response, endpoint, options);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private prepareHeaders(existingHeaders?: HeadersInit): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...existingHeaders
        };

        const token = this.getAuthToken();
        if (token) {
            headers["Authorization"] = token;
        }

        return headers;
    }

    private async handleResponse<T>(
        response: Response,
        endpoint: string,
        options: RequestInit
    ): Promise<FetchResult<T>> {
        if (response.ok) {
            try {
                const data = response.status === 204 ? null : await response.json();
                return { result: data, error: null };
            } catch (error) {
                if (response.status !== 204) {
                    return {
                        result: null,
                        error: {
                            status_code: response.status,
                            status_text: response.statusText,
                            error_message: 'Invalid JSON response'
                        }
                    };
                } else {
                    return {
                        result: null,
                        error: null
                    };
                }
            }
        } else if (response.status === 401) {
            if (endpoint === "/auth/refresh") {
                return {
                    result: null,
                    error: {
                        status_code: response.status,
                        status_text: response.statusText,
                        error_message: await this.getErrorMessage(response)
                    }
                };
            }

            const refreshResult = await this.refresh();

            if (refreshResult.result) {
                return this.fetchApi<T>(endpoint, options);
            } else {
                this.clearAuthData();
                return {
                    result: null,
                    error: refreshResult.error
                };
            }
        } else {
            return {
                result: null,
                error: {
                    status_code: response.status,
                    status_text: response.statusText,
                    error_message: await this.getErrorMessage(response)
                }
            };
        }
    }

    private async getErrorMessage(response: Response): Promise<string> {
        try {
            return await response.text();
        } catch {
            return 'Unknown error';
        }
    }

    private handleError(error: unknown): FetchResult<never> {
        return {
            result: null,
            error: {
                status_code: 0,
                status_text: 'Network Error',
                error_message: error instanceof Error ? error.message : 'Unknown error'
            }
        };
    }

    private getAuthToken(): string | null {
        const token = localStorage.getItem("access_token");
        const tokenType = localStorage.getItem("token_type");

        if (token && tokenType) {
            return `${tokenType} ${token}`;
        }

        return null;
    }

    private setAuthData(data: AuthResult): void {
        if (data.accessToken) {
            localStorage.setItem("access_token", data.accessToken);
        }
        if (data.tokenType) {
            localStorage.setItem("token_type", data.tokenType);
        }
    }

    private clearAuthData(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
    }

    public isAuthenticated(): boolean {
        return !!this.getAuthToken();
    }

    public getAuthHeader(): string | null {
        return this.getAuthToken();
    }

    async login(user: AuthUserData): Promise<FetchResult<AuthResult>> {
        const result = await this.fetchApi<AuthResult>("/auth/login", {
            method: "POST",
            body: JSON.stringify(user)
        });

        if (result.result) {
            this.setAuthData(result.result);
        }

        return result;
    }

    async refresh(): Promise<FetchResult<AuthResult>> {
        const result = await this.fetchApi<AuthResult>("/auth/refresh", {
            method: "POST",
        });

        if (result.result) {
            this.setAuthData(result.result);
        }

        return result;
    }

    async register(user: RegisterUserData): Promise<FetchResult<AuthResult>> {
        const result = await this.fetchApi<AuthResult>("/auth/register", {
            method: "POST",
            body: JSON.stringify(user)
        });

        if (result.result) {
            this.setAuthData(result.result);
        }

        return result;
    }

    async logout(): Promise<FetchResult<void>> {
        const result = await this.fetchApi<void>("/auth/logout", {
            method: "POST"
        });

        this.clearAuthData();
        localStorage.clear();

        return result;
    }
}

export const apiClient = new ApiClient();