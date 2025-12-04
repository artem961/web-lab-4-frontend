import { type CheckResult, type Dot, type FetchResult } from "./interfaces";

export async function checkHit(dot: Dot): Promise<FetchResult<CheckResult>> {
    try {
        const response = await fetch("/api/dots/check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dot),
        });

        if (response.ok) {
            let result = await response.json();
            return {
                result: {
                    x: result.x,
                    y: result.y,
                    r: result.r,
                    result: result.result,
                    time: result.time,
                    current_time: result.currentTime
                },
                error: null
            };
        } else {
            return {
                result: null,
                error: {
                    status_code: response.status,
                    status_text: response.statusText,
                    error_message: await response.text().catch(() => 'Unknown error')
                }
            };
        }
    } catch (error) {
        return {
            result: null,
            error: {
                status_code: 400,
                status_text: 'Network Error',
                error_message: error instanceof Error ? error.message : 'Unknown error occurred'
            }
        };
    }
}