const api = "http://localhost:8080";

export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith("/api/")){
        let redirectUrl = event.url.pathname.replace("/api/", api);
    }

	return await resolve(event);
}