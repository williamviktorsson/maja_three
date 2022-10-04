const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let horizontal = 0;
let aim = 0;
let depth= 0;

rl.on('line', (line) => {

    var nums = line.split(' ');
    var directive = nums[0];
    var distance = parseInt(nums[1]);

    switch (directive) {
        case "forward":
            horizontal += distance;
            depth+=(aim*distance);
            break;
        case "up":
            aim -= distance;
            break;
        case "down":
            aim += distance;
            break;
    }



    /*Solve the test case and output the answer*/
});

rl.on("close", () => {
    console.log(horizontal * depth);
})
