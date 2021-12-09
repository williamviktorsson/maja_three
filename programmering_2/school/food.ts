export interface Food {
    calories: number;
    consume(percent: number): number;
}

export class Burger implements Food {
    calories: number;

    constructor(calories){
        this.calories=calories
    }

    consume(percent: number): number {
        let bite = this.calories * (percent / 100);
        this.calories -= bite;
        return bite;
    }
}