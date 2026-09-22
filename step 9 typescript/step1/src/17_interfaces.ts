// interface -> named shape for objects

interface User333{
    id: string;
    name: string;
    email?: string;
    readonly createdAt: Date;
}

const user333: User333 = {
    id: "1",
    name: "a",
    createdAt: new Date()
}

interface Admin333 extends User333 {
    permissions: string[]
}

const admin333: Admin333 = {
    id: "1",
    name: "a",
    createdAt: new Date(),
    permissions: ['admin']
}

interface WithMeta {
    meta: {
        active: boolean
    }
}

interface AdminWithMeta extends Admin333, WithMeta{}

const adminWithMeta: AdminWithMeta = {
    id: "1",
    name: "a",
    createdAt: new Date(),
    permissions: ['admin'],
    meta: {
        active: true
    }
}