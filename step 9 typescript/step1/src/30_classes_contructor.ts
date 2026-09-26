class UserN15 {

    id: string;
    name: string;
    email?: string;
    createdAt: Date = new Date() // init at declaration -> ok

    constructor(id: string, name: string, email?: string){
        // assign all required fields here
        this.id = id;
        this.name = name;
        if(email) this.email = email
    }
}

const result4 = new UserN15("1", "bete");