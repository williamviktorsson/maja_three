const readline = require("readline-sync");

function input(prompt: string): any {
    let answer = readline.question(prompt + "\n" + "> ");
    return answer;
}

interface Person {
    keychain: Key[];
    bag: Item[];
}

class Employee implements Person {
    keychain: Key[] = [];
    bag: Item[] = [];
}

interface Shop {
    door: Door;
    enter(person: Person): boolean;
}

class PetShop implements Shop {
    door: Door;

    constructor(door: Door) {
        this.door = door;
    }

    enter(person: Person): boolean {
        if (this.door.lock.locked) {
            let how_open: String = input("how would you like to open the door? (kick,force,flamethrower,key)");
            switch (how_open) {
                case "kick":
                    return this.door.kick()
                case "force":
                    return this.door.kick_extremely_hard();
                case "flamethrower":
                    let i = person.bag.findIndex((thing) => thing instanceof FlameThrower);
                    if (i >= 0 && i < person.bag.length) {
                        return this.door.open_with_flamethrower(person.bag[i] as FlameThrower)
                    }
                    return false;
                case "key":
                default:
                    let i2 = person.keychain.findIndex((key) => key.id == this.door.lock.id);
                    if (i2 >= 0 && i2 < person.keychain.length) {
                        console.log("trying to open with the key from the keychain")
                        return this.door.open(person.keychain[i2])
                    } else {
                        console.log("did not find key in keychain")
                    }
                    return false;
            }
        }
    }

}

interface Door {
    lock: Lock;
    open(key: Key): boolean;
    kick(): boolean;
    kick_extremely_hard(): boolean;
    open_with_flamethrower(flamethrower: FlameThrower)

}

class PetDoor implements Door {
    lock: Lock = new PetLock();
    open(key: Key): boolean {
        let success: boolean = this.lock.unlock(key);
        if (this.lock.locked) {
            console.log("still locked, wrong key")
        } else {
            console.log("door unlocked")
        }
        return success;
    }
    kick(): boolean {
        console.log("too weak");

        return false;
    }
    kick_extremely_hard(): boolean {
        console.log("wow what a hard kick, the door flew away");
        return true;
    }
    open_with_flamethrower(flamethrower: FlameThrower) {
        if (flamethrower.fuel > 0) {
            console.log("the door burns to the ground");
            flamethrower.fuel--;
            return true;
        } else return false;
    }

}

interface Lock {
    locked: boolean;
    id: string;
    unlock(key: Key): boolean;
    lock(key: Key): boolean;
}

class PetLock implements Lock {
    locked: boolean = true;
    id: string = "djurmagasinet";
    unlock(key: Key): boolean {
        this.locked = !(this.id == key.id);
        if (this.locked) {
            console.log("lock still locked")
        } else {
            console.log("lock unlocked")
        }
        return this.id == key.id;
    }
    lock(key: Key): boolean {
        this.locked = this.id == key.id;
        if (this.locked) {
            console.log("lock locked")
        } else {
            console.log("lock still unlocked")
        }
        return this.id == key.id;
    }

}

interface Key {
    id: string;
}

class PetKey implements Key {
    id: string = "djurmagasinett";

}

interface Item {

}

class FlameThrower implements Item {
    fuel: number = 0;
}

let zewei: Person = new Employee()
let ft = new FlameThrower();
ft.fuel = 20;
zewei.bag.push(ft)
zewei.keychain.push(new PetKey())

let shop = new PetShop(new PetDoor());

while (shop.enter(zewei) != true) {
};