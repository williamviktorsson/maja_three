
import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = parse(event.request.headers.get('cookie') || '');

    if (cookies.token) {
        event.locals.token = cookies.token
    }

    const response = await resolve(event);


    return response;

}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
    return request?.locals?.token
        ? {
            token: request?.locals?.token
        }
        : {};
}