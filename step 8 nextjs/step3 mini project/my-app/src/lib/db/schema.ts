import { defineRelations } from "drizzle-orm"
import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
    id: varchar("id", {length: 255}).primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    email: varchar("email", {length: 255}).notNull().unique(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image"), 
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const sessions = pgTable("sessions", {
    id: varchar("id", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).references(()=>users.id).notNull(),
    token: varchar("token", {length: 255}),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: varchar("ip_address", {length: 255}),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const accounts = pgTable("accounts", {
    id: varchar("id", {length: 255}).primaryKey(),
    userId: varchar("user_id", {length: 255}).references(()=>users.id).notNull(),
    accountId: varchar("account_id", {length: 255}).notNull(),
    providerId: varchar("provider_id", {length: 255}).notNull(),
    password: text("password"),
    accessToken: text("access_token"),                     
    refreshToken: text("refresh_token"),               
    idToken: text("id_token"),                                
    accessTokenExpiresAt: timestamp("access_token_expires_at"), 
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"), 
    scope: text("scope"), 
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const verifications = pgTable("verification", {
    id: varchar("id", {length: 255}).primaryKey(),
    identifier: varchar("identifier", {length: 255}).notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: varchar("title", {length: 255}).notNull(),
    description: varchar("description", {length: 255}).notNull(),
    slug: varchar("slug", {length: 255}).notNull().unique(),
    content: text("content").notNull(),
    authorId: varchar("author_id", {length: 255}).references(()=>users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const usersRelations = defineRelations({ users , posts, accounts, sessions }, (r) => ({
  posts: {
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
    })
  },
  accounts: {
    user: r.one.users({
        from: r.accounts.userId,
        to: r.users.id
    })
  },
  sessions: {
    user: r.one.users({
        from: r.sessions.userId,
        to: r.users.id
    })
  },
    users: {
    posts: r.many.posts(),
    accounts: r.many.accounts(),
    sessions: r.many.sessions()
  }
}))

