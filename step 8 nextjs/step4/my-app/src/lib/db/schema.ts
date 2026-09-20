import { defineRelations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, serial, uuid, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
});

export const asset = pgTable("asset", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbNailUrl"),
  isApproved: text("is_approved").default("pending").notNull(),
  userId: text("user_id").notNull().references(()=>user.id, {onDelete: "cascade"}),
  categoryId: integer("category_id").references(()=>category.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
})

export const payment = pgTable("payment", {
  id: uuid("id").defaultRandom().primaryKey(),
  amount: integer("amount").notNull(),
  currency: text("currency").default("USD").notNull(),
  status: text("status").notNull(),
  provider: text("provider").notNull(),
  providerId: text("provider_id"),
  userId: text("user_id").notNull().references(()=>user.id),
   createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
})

export const purchase = pgTable("purchase", {
   id: uuid("id").defaultRandom().primaryKey(),
   assetId: uuid("asset_id").notNull().references(()=>asset.id, {onDelete: "restrict"}),
   userId: text("user_id").notNull().references(()=>user.id, {onDelete: "cascade"}),
   paymentId: uuid("payment_id").notNull().references(()=> payment.id),
   price: integer("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  
})

export const invoice = pgTable("invoice", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  purchaseId: uuid("purchase_id").notNull().references(()=>purchase.id, {onDelete:"cascade"}),
  userId: text("user_id").notNull().references(()=>user.id, {onDelete: "cascade"}),
  amount: integer("amount").notNull(),
  currency: text("currency").default("USD").notNull(),
  status: text("status").notNull(),
  htmlContent: text("html_content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
})

export const authRelations = defineRelations(
  { user, session, account, verification, category, asset, payment, purchase, invoice },
  (r) => ({
    user: {
      sessions: r.many.session({ from: r.user.id, to: r.session.userId }),
      accounts: r.many.account({ from: r.user.id, to: r.account.userId }),
      assets: r.many.asset({ from: r.user.id, to: r.asset.userId }),
      payment: r.many.payment({ from: r.user.id, to: r.payment.userId }),
      purchase: r.many.purchase({ from: r.user.id, to: r.purchase.userId }),
      invoice: r.many.invoice({ from: r.user.id, to: r.invoice.userId }),
    },
    session: {
      user: r.one.user({ from: r.session.userId, to: r.user.id }),
    },
    account: {
      user: r.one.user({ from: r.account.userId, to: r.user.id }),
    },
      category: {
      assets: r.many.asset({ from: r.category.id, to: r.asset.categoryId }),
    },
    asset: {
      user: r.one.user({ from: r.asset.userId, to: r.user.id }),
      category: r.one.category({ from: r.asset.categoryId, to: r.category.id }),
      purchase: r.many.purchase({ from: r.asset.id, to: r.purchase.assetId })
    },
    payment: {
        user: r.one.user({ from: r.payment.userId, to: r.user.id }),
        purchase: r.one.purchase({ from: r.payment.id, to: r.purchase.paymentId })
    },
    purchase: {
        user: r.one.user({ from: r.purchase.userId, to: r.user.id }),
        asset: r.one.asset({ from: r.purchase.assetId, to: r.asset.id }),
        payment: r.one.payment({ from: r.purchase.paymentId, to: r.payment.id }),
        invoice: r.one.invoice({ from: r.purchase.id, to: r.invoice.purchaseId })
    },
    invoice: {
       user: r.one.user({ from: r.invoice.userId, to: r.user.id }),
       purchase: r.one.purchase({ from: r.invoice.purchaseId, to: r.purchase.id })
    }
  }),
);