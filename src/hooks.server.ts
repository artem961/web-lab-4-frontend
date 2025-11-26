export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith("/api/")){
        console.log("API request")
    }

	return await resolve(event);
}