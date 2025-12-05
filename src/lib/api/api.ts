import { type CheckResult, type Dot, type FetchResult, type AuthUserData, type AuthResult , type RegisterUserData} from "./interfaces";

export async function checkHit(dot: Dot): Promise<FetchResult<CheckResult>> {

    const response = await fetch("/api/dots/check", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAutorizationHeader()
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
}

export async function login(user: AuthUserData): Promise<FetchResult<AuthResult>> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        let result = await response.json();
        return {
            result: {
                access_token: result.accessToken,
                token_type: result.tokenType
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
}

export async function logout() {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
    });

    localStorage.clear();
}

export async function register(user: RegisterUserData): Promise<FetchResult<AuthResult>> {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        let result = await response.json();
        return {
            result: {
                access_token: result.accessToken,
                token_type: result.tokenType
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
}

export async function getAllResults(): Promise<FetchResult<CheckResult[]>> {

    const response = await fetch("/api/dots/all", {
        method: "GET",
        headers: {
            'Authorization': getAutorizationHeader()
        }});

    if (response.ok) {
        let result = await response.json();
        let resultsArray: CheckResult[] = []

        result.forEach(result => {
            resultsArray.push({
                x: result.x,
                y: result.y,
                r: result.r,
                result: result.result,
                time: result.time,
                current_time: result.currentTime
            })
        });
        return {
            result: resultsArray,
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
}

export async function deleteAllResults() {

    const response = await fetch("/api/dots/all", {
        method: "DELETE",
        headers: {
            'Authorization': getAutorizationHeader()
        }});
}



function getAutorizationHeader(){
    let token = localStorage.getItem("access_token");
    let tokenType = localStorage.getItem("token_type");
    return tokenType + " " + token;
}