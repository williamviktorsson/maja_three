import { Coal, Item, Present } from './item';
import { Order, StartFactoryOrder, TiredOrder } from './order';

const readline = require("readline-sync");

function input(prompt: string): any {
    let answer = readline.question(prompt + "\n" + "> ");
    return answer;
}

export interface Santa {

    sack: Item[];

    laugh(): string;
    order(): Order;
    gift(isChildNice: boolean): Item;
    collect(item: Item): void;
}

export class RealSanta implements Santa {

    protected anger: number;
    sack: Item[];

    constructor() {
        this.anger = 0;
        this.sack = [];
    }

    collect(item: Item): void {
        this.sack.push(item);
    }

    laugh(): string {
        return "hoho";
    }
    order(): Order {

        let answer: string = input("What should the real santa do? [start, nothing]") 

        if (answer.includes('start')) {
            return new StartFactoryOrder();
        }

        return new TiredOrder();

    }

    gift(isChildNice: boolean): Item {

        if (isChildNice) {

            let i = this.sack.findIndex((item) => item instanceof Present);
            if (i >= 0 && i < this.sack.length) { // check if an index was found where a Present exist
                return this.sack.splice(i, 1).pop(); // Remove 1 item from index i and return it
            }

        }

        // Out of gifts, , not nice, or unlycky kids get Coal.
        return new Coal();

    }

}