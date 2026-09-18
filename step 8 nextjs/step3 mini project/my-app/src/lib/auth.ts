import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "./db";
import * as schema from "./db/schema"

export const auth = betterAuth({
    appName: "blog",
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    database: drizzleAdapter(db, {
     provider: "pg",
     schema: {
        ...schema,
        user: schema.users,
        session: schema.sessions,
        account: schema.accounts,
        verification: schema.verifications,
     }
    }),
    emailAndPassword:{
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength:6,
        maxPasswordLength: 124,
        autoSignIn: false
    },
    session: {
        expiresIn: 60*60*24*7,
        updateAge: 60*60*24,
        cookieCache: {
            enabled: true,
            maxAge: 60*5
        },
        disableSessionRefresh: true,
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
        defaultCookieAttributes: {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production"
        }
    }

})