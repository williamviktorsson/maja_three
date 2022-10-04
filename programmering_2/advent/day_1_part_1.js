const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let temp = null;
let count = 0;

rl.on('line', (line) => {

    if (temp == null) {
        temp = parseInt(line)
    } else {
        if (parseInt(line) > temp) {
            count++;
        }
        temp = parseInt(line);
    }

    /*Solve the test case and output the answer*/
});

rl.on("close", () => {
    console.log(count);
})
