import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post() {
	return {
		headers: {
			'Set-Cookie': serialize('token', null, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 0 // one minute
			}),
			location: '/login'
		},
		status: 302
	};
}