// public is default can access from anywhere
// private block access outside class

class BankAccount{

    public owner: string

    private bal = 0;

    #otp = 123456 // run in runtime or inforce in runtime because of #. private property

    constructor(owner: string){
        this.owner = owner
    }

    depost(amt: number){
        if(amt<=0) throw new Error("amount must be positive")
             this.bal += amt;
    }

    getBalance(){
        return this.bal
    }

    verifyOtp(code: number){
        return this.#otp === code // only accessibable inside the class
    }

}

const acc = new BankAccount("Bell")
acc.depost(125000)
console.log(acc.getBalance)

