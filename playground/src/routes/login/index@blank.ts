import { serialize } from 'cookie';
import * as database from '$lib/database';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const data = await request.formData();
	const client = await database.connect();
	const db = client.db("test");

	const username = data.get('username');
	const password = data.get('password');

	const result = await db.collection("authentication").findOne({ 'username': username, 'password': password });


	if (result == null) {
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
				maxAge: 120 // two minutes
			}),
			location: '/'
		},
		status: 302
	};
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function del() {
	return {
		headers: {
			'Set-Cookie': serialize('token', null, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 0 // one minute
			}),
		},
		status: 200
	};
}

