import config from '$lib/app-config.json';
const api = config.backend_host;


export async function handle({ event, resolve }) {
   if (event.url.pathname.startsWith("/api/")) {
        const redirectUrl = api + event.url.pathname.replace("/api/", "");
        
        try {
            const response = await event.fetch(redirectUrl, {
                method: event.request.method,
                headers: event.request.headers,
                body: event.request.body,
                duplex: 'half'
 });
            
        
            const responseHeaders = new Headers(response.headers);
            
            
            return new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders
            });
            
        } catch (error) {
            console.error('Proxy error:', error);
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
    
    return await resolve(event);
}