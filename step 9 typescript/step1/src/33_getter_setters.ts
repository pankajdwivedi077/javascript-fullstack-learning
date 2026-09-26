// get
// set

class Temperature{

    #c = 0;

    constructor(cel: number){
        this.cel = cel
    }

    get cel(): number{
        return this.#c
    }

    set cel(val: number){
        if(Number.isNaN(val)) throw new Error('not a number')
            this.#c = val;
    }

    get far():number{
        return (this.#c * 9)/5+32
    }

    set far(f:number){
        this.cel = ((f-32)*5)/9
    }

}

const c1 = new Temperature(21)