import type { 
    CheckResult, Dot, FetchResult, 
    AuthUserData, AuthResult, RegisterUserData, 
    ApiError 
} from "./interfaces";

class ApiClient {
    private baseUrl = "/api";
    
    private async fetchApi<T>(
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
            
            return await this.handleResponse<T>(response);
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
            headers['Authorization'] = token;
        }
        
        return headers;
    }
    
    private async handleResponse<T>(response: Response): Promise<FetchResult<T>> {
        if (response.ok) {
            try {
                const data = await response.json();
                return { result: data, error: null };
            } catch (error) {
                return {
                    result: null,
                    error: {
                        status_code: response.status,
                        status_text: response.statusText,
                        error_message: 'Invalid JSON response'
                    }
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
        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
        }
        if (data.token_type) {
            localStorage.setItem("token_type", data.token_type);
        }
    }
    
    private clearAuthData(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_type");
    }
    
    // === Публичные методы ===
    
    // Точки
    async checkHit(dot: Dot): Promise<FetchResult<CheckResult>> {
        return this.fetchApi<CheckResult>("/dots/check", {
            method: "POST",
            body: JSON.stringify(dot)
        });
    }
    
    async getAllResults(): Promise<FetchResult<CheckResult[]>> {
        return this.fetchApi<CheckResult[]>("/dots/all");
    }
    
    async deleteAllResults(): Promise<FetchResult<void>> {
        const result = await this.fetchApi<void>("/dots/all", {
            method: "DELETE"
        });
        
        // Даже если запрос не удался, возвращаем успех на клиенте
        if (result.error) {
            console.warn("Failed to delete results on server:", result.error);
        }
        
        return { result: undefined, error: null };
    }
    
    // Авторизация
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
        
        // Всегда очищаем локальные данные
        this.clearAuthData();
        localStorage.clear();
        
        return result;
    }
    
    // Утилиты
    isAuthenticated(): boolean {
        return !!this.getAuthToken();
    }
    
    getAuthHeader(): string | null {
        return this.getAuthToken();
    }
}

// Экспортируем единственный экземпляр
export const apiClient = new ApiClient();