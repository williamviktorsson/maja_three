import { DefaultPerson } from './person'
import { Burger } from './food'

let burger = new Burger(1337)
let hangry = new DefaultPerson(2000)

setInterval(() => {
    hangry.breathe()
    console.log(hangry.energy)
}, 1000)

hangry.eat(burger, 20);

console.log("Hangry person energy: " + hangry.energy);
console.log("Burger calories: " + burger.calories);

hangry.eat(burger, 20);
console.log("Hangry person energy: " + hangry.energy);
console.log("Burger calories: " + burger.calories);

hangry.eat(burger, 20);
console.log("Hangry person energy: " + hangry.energy);
console.log("Burger calories: " + burger.calories);

hangry.sleep().then((energy) => {
    console.log("i gained this much energy: " + energy)
    console.log("Hangry person energy: " + hangry.energy);
})