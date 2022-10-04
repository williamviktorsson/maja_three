import { Part } from './part'

export interface Item {
    produce(parts: Part[]): Item;
}

export class Coal implements Item {
    produce(parts: Part[]): Item {
        return new Coal();
    }
}

export class Present implements Item {
    produce(parts: Part[]): Item {
        return new Present();
    }
}