

let clicks = 0;

export async function get( ) {
    return {
        body: {
            clicks,
            increase: 500
        },
    };
}

export function post() {
    clicks = clicks + 1;
    return {
        body: {
            clicks,
            increase: 500
        },
    };
}