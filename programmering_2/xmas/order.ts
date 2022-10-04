export interface Order {
    content: any;
}

export class StartFactoryOrder implements Order {
    content: any;

    constructor() {
        this.content = "POWER THIS FACTORY ON!"
    }
}


export class TiredOrder implements Order {
    content: any;
    constructor() {
        this.content = "Nothing..."
    }
}