import { serialize } from 'cookie';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const data = await request.formData();

	const username = data.get('username');
	const password = data.get('password');

	if (username != 'william' || password != 'maja') {
		// return validation errors

		return {
			status: 400,
			body: {
				error: 'wrong password'
			}
		};
	}

	return {
		headers: {
			'Set-Cookie': serialize('token', 'secret', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 // one minute
			}),
			location: '/'
		},
		status: 302
	};
}


