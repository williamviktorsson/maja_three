import * as database from '$lib/database';


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {

    const client = await database.connect();
    const db = client.db("test");

    // Update only if does not already exist and then set clicks to 0
    // upsert is to insert if it does not exist, setOnInsert tells us what to set 
    // if we are upserting :)
    const result = await db.collection("clicks").findOneAndUpdate(
        {},
        {
            $setOnInsert: { clicks: 0 }
        },
        { upsert: true, returnDocument: 'after', }
    )

    return {
        body: { clicks: result.value.clicks }
    }
}