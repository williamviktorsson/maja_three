
import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookies = parse(event.request.headers.get('cookie') || '');
    event.locals.token = cookies.token;

    // not logged in, go to login page if not on login page
    if (!cookies.token && event.url.pathname != '/login') {
        return new Response('', {
            headers: {
                location: '/login'
            },
            status: 302
        });
    }

    // logged in but went to login page, redirect to home page
    if (cookies.token && event.url.pathname == '/login' && event.request.method == 'GET') {
        return new Response('', {
            headers: {
                location: '/'
            },
            status: 302
        });
    }

    // logged in and navigating any page
    return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {
    return request?.locals?.token
        ? {
            token: request?.locals?.token
        }
        : {};
}