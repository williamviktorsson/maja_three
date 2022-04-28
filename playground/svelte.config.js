import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { Server } from 'socket.io'; // <-- Import the Socket.IO server
import { MongoClient } from 'mongodb';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				{
					name: 'sveltekit-socket-io',
					configureServer(server) {
						const io = new Server(server.httpServer);

						// This is located in the svelte config (see above "Socket.IO stuff goes here")
						io.on('connection', async (socket) => {

							const client = await MongoClient.connect("mongodb://localhost:27017/");
							const db = client.db("test");

							// emit click events to all subscribers
							socket.on('clicks', async (click) => {


								// find the clicks and update it. Upsert means create it if it does not already exist :)
								const result = await db.collection("clicks").findOneAndUpdate(
									{},
									{
										$inc: { clicks: click },

									},
									{ upsert: true, returnDocument: 'after', }

								)

								io.emit('clicks', { clicks: result.value.clicks });
							});

						});


						console.log('SocketIO injected');
					}
				}
			]
		}
	}
};

export default config;
