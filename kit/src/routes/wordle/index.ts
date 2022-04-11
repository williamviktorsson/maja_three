
import words from "$lib/data/words.json";


export async function get() {

    const word = words.length > 0
        ? words[Math.floor(Math.random() * words.length)].toUpperCase()
        : "HORSE";

    if (word) {
        return {
            body: { word }
        };
    }

    return {
        status: 404
    };
}