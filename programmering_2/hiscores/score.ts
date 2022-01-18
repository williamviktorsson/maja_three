import { Player } from "./player";

export interface Score {
    value: number;
    date: Date;
}

export class JumpScore implements Score {
    value: number;
    date: Date;
    constructor(value: number, date: Date) {
        this.value = value;
        this.date = date;
    }
}