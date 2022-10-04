import { Observable } from 'rxjs';


class Timer {

    observable: Observable<number>;
    constructor(counter = 90) {

        this.observable = new Observable(subscriber => {
            let count = counter;
            let intervalId = setInterval(() => {
                subscriber.next(count);
                if (count === 0) {
                    subscriber.complete();
                    clearInterval(intervalId);
                }
                count = count - 1;
            }, 1000);
        });
    }
}

let timeTicking = new Timer()

timeTicking.observable.subscribe({
    next(x) {
        console.log('YA ' + x);
    },
})

timeTicking.observable.subscribe({
    next(x) {
        console.log('YEET ' + x);
    },
})

timeTicking.observable.subscribe({
    next(x) {
        console.log('OF ' + x);
    },
})