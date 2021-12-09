import { Food } from './food'

interface Person {

    energy: number;
    breathe(): void;
    sleep(): Promise<number>;
    eat(food: Food, percent: number): void;

}

export class DefaultPerson implements Person {

    energy: number;

    constructor(energy) {
        this.energy = energy;
    }

    breathe(): void {
        this.energy -= 100;
        console.log("FRESH AIR")
        if (this.energy <= 0) {
            console.log("im dead")
            throw Error("yep im dead")
        }
    }
    sleep(): Promise<number> {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                let regen = 400
                this.energy += regen
                resolve(regen)
            }, 4000)
        })
    }
    eat(food: Food, percent: number): void {
        let energy = food.consume(percent);
        this.energy += energy;
    }

}

