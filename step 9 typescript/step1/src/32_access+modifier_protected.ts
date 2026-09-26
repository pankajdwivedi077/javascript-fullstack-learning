// proteched -> available from class and subclass

class Animal{
    protected energy = 23

    eat(amt: number){
        this.energy = Math.min(100, this.energy += amt)
    }
}

class Dog extends Animal {
    run(){
        this.energy -= 10;
    }
    status(){
        return this.energy
    }
}

const d = new Dog()
d.eat(2)