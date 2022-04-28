/** @type {import('./[question]').RequestHandler} */
export async function get({ params }) {

    const answers = await fetch(
        `https://demo.dataverse.org/api/search?q=` + params.question
    ).then((e) => e.json());

    return {
        body: {
            // answers in props matches to "export let answers in script tag"
            // params.question matches [question].svelte
            answers,
        },
    };
}