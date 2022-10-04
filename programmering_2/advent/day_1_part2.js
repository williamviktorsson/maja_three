const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let a = 0;
let b = 0;
let c = 0;
let d = 0;
let count = 0;

rl.on('line', (line) => {

    d = parseInt(line);

    let curr = d + c + b;
    let prev = c + b + a;

    if (a != 0 && b != 0 && c != 0) {

        if (curr > prev) {
            count++;
        }
    }
    a = b;
    b = c;
    c = d;


    /*Solve the test case and output the answer*/
});

rl.on("close", () => {
    console.log(count);
})
