import { Elf } from './elf';

export interface Factory {
    activate(): void;
    elves: Elf[];
}

export class ChristmasFactory implements Factory {
    activate(): void {
        this.elves.forEach(elf => {
            elf.work();
        });
    }
    elves: Elf[];

    constructor(elves: Elf[] = []) {
        this.elves = elves;
    }

}