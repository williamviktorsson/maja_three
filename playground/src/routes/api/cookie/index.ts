let clicks = 0;

export async function get(){
    return {
        body: {
            clicks
        }
    }
}

export async function post(){

    clicks = clicks + 1;

    return {
        body: {
            clicks
        }
    }
}