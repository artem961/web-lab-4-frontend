export interface Dot {
    x: number,
    y: number,
    r: number
}

export interface CheckResult {
    id: number,
    x: number,
    y: number,
    r: number
    result: boolean,
    time: string,
    currentTime: string
    user: User
}

export interface ApiError {
    status_code: number,
    status_text: string,
    error_message: string
}

export interface FetchResult<T> {
    result: T | null,
    error: ApiError | null
}

export interface AuthUserData {
    username: string,
    password: string
}

export interface RegisterUserData {
    username: string,
    password: string
}


export interface AuthResult {
    accessToken: string,
    tokenType: string
}

export interface User{
    username: string,
    id: number
}