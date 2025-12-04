export interface Dot {
    x: number,
    y: number,
    r: number
}

export interface CheckResult {
    x: number,
    y: number,
    r: number
    result: boolean,
    time: string,
    current_time: string
}

export interface Error{
    status_code: number,
    status_text: string,
    error_message: string
}

export interface FetchResult<T>{
    result: T | null,
    error: Error | null
}