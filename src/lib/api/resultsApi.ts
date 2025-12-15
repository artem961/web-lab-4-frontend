import { apiClient } from "./apiClient";
import type { AuthResult, AuthUserData, CheckResult, Dot, FetchResult, RegisterUserData, User } from "./interfaces";

let ETag: string = "";

export async function getAllResults(): Promise<FetchResult<CheckResult[]>> {
    let result = apiClient.fetchApi<CheckResult[]>("/dots/all", {
        headers: {
            "If-None-Match": ETag
        }
    });

    if ((await result).error?.status_code !== 304){
        ETag = (await result).headers?.get("ETag");
    }

    return result;
}

export async function checkHit(dot: Dot): Promise<FetchResult<CheckResult>> {
    return apiClient.fetchApi<CheckResult>("/dots/check", {
        method: "POST",
        body: JSON.stringify(dot)
    });
}


export async function deleteAllResults(): Promise<FetchResult<void>> {
    const result = await apiClient.fetchApi<void>("/dots/all", {
        method: "DELETE"
    });


    return { result: undefined, error: null };
}

export async function deleteResultById(id: number): Promise<FetchResult<void>>{
    let result = await apiClient.fetchApi<void>("/dots/" + id, {
        method: "DELETE"});

    return result;
}