// partial<T> -> make all the top level fields optional or maybe absent

type AddressN8 = {
    line1: string;
    city: string;
}

type User10 = {
    id: string;
    name: string;
    email?: string;
    address: AddressN8;
}

type UserPatch10 = Partial<User10>

const patch10: UserPatch10 = {
    name: "a"
}

const patch11: UserPatch10 = {
    address: {
        line1: "a",
        city: "b"
    }
}

// Required<T>

type UserAllRequiredN10 = Required<User10>

const userAll: UserAllRequiredN10 = {
   id: "1",
   name: "bell",
   email: "b@",
   address: {
    line1: "22",
    city: "fg"
   }
}

// Readonly<T>

type ReadonlyUserN10 = Readonly<User10>
const realdonlyU: ReadonlyUserN10 = {
    id: "u3",
    name: "raju",
    address: {
        line1: "line1",
        city: "city"
    }
}

//Pick<T, K> keep only some keys

type PublicUserN10 = Pick<User10, "id" | "name">
const publicUser: PublicUserN10 = {
    id: 'u5',
    name: 'pp'
}

// Omit<T, K> remove some keys
type UserWithoutEmail = Omit<User10, "email">
const omitUser: UserWithoutEmail = {
    id: 'u4',
    name: "n5",
    address: {
        line1: 'rr',
        city: "cc"
    }
}

// Record<K, V> 
type Rolek = 'admin' | 'user'
type RoleCheck = Record<Rolek, User10>

const dirN10: RoleCheck = {
    admin: {
        id: 'u10',
        name: 'admin',
        address: {
            line1: "1",
            city: 'dd'
        }
    },
    user: {
        id: 'u11',
        name: 'user',
        address: {
            line1: "2",
            city: 'cc'
        }
    }
}