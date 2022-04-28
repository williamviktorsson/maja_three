let clicks = 0;

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    return {
        body: {
            clicks
        }
    }
}

export async function post() {

    clicks = clicks + 1;

    console.log(clicks);

    return {
        body: {
            clicks
        }
    }
}