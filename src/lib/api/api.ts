import { apiClient } from "./apiClient";
import type { AuthResult, AuthUserData, CheckResult, Dot, FetchResult, RegisterUserData, User } from "./interfaces";


export async function checkHit(dot: Dot): Promise<FetchResult<CheckResult>> {
    return apiClient.fetchApi<CheckResult>("/dots/check", {
        method: "POST",
        body: JSON.stringify(dot)
    });
}

export async function getAllResults(): Promise<FetchResult<CheckResult[]>> {
    return apiClient.fetchApi<CheckResult[]>("/dots/all");
}

export async function deleteAllResults(): Promise<FetchResult<void>> {
    const result = await apiClient.fetchApi<void>("/dots/all", {
        method: "DELETE"
    });

    if (result.error) {
        console.warn("Failed to delete results on server:", result.error);
    }

    return { result: undefined, error: null };
}

export async function login(user: AuthUserData): Promise<FetchResult<AuthResult>> {
    return apiClient.login(user);
}

export async function register(user: RegisterUserData): Promise<FetchResult<AuthResult>> {
    return apiClient.register(user);
}

export async function logout(): Promise<FetchResult<void>> {
    return apiClient.logout();
}

export async function getUserInfo(): Promise<FetchResult<User>> {
    let result = await apiClient.fetchApi<User>("/users/me", {
        method: "GET"
    });

    if (result.error) {
        console.warn("Failed to get user info!:", result.error);
    }

    return result;
}