import { Elf } from './elf'
import { ChristmasFactory, Factory } from './factory'
import { Item, Present } from './item'
import { Part } from './part'
import { Santa, RealSanta } from './santa'
import { Order, StartFactoryOrder } from './order';

async function main() {

    let santa: Santa = new RealSanta();


    let order: Order = santa.order();

    if (order instanceof StartFactoryOrder) {
        console.log("starting...")
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("Factory running!")

    }


    let factory: Factory = new ChristmasFactory()

    santa.sack = [new Present()];

    let serialized: string = JSON.stringify(santa);

    console.log(serialized);

    let deserialized: Santa = JSON.parse(serialized);

    console.log(deserialized);

}

main();