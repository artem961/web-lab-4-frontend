import { type Dot } from "./interfaces";

export async function checkHit(dot: Dot) {
    let response = await fetch(
        "/api/checkHit",
        {
            "method": "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dot),
        });

    if (response.ok) {
        let data = response.json;

        return data;
    }
}

