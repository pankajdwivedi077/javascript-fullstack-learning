"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { asset, category, invoice, payment, purchase, user } from "@/lib/db/schema"
import { eq, and, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import * as z from "zod"
import { v4 as uuid } from "uuid";
import { generateInvoice } from "@/lib/invoice/invoice-htm-generator"

export async function createInvoiceAction(purchaseId: string){
  try {
        const session = await auth.api.getSession({
        headers: await headers()
      })
      if(!session?.user?.id){
       return {
        success: false,
        error: "Not authenticated"
       }
      }

const [purchaseData] = await db.select({
    purchase: purchase,
    asset: asset,
    payment: payment,
    user: user
}).from(purchase)
  .innerJoin(asset, eq(purchase.assetId, asset.id))
  .innerJoin(payment, eq(purchase.paymentId, payment.id))
  .innerJoin(user, eq(purchase.userId, user.id))   
  .where(eq(purchase.id, purchaseId)).limit(1);

      if(!purchaseData){
        return {
            success: false,
            error: "Purchase not found"
        }
      }

      if(purchaseData.purchase.userId !== session?.user.id && session.user.role !== "admin"){
        return {
            success: false,
            error: "Not authorized"
        }
      }

      const invoiceNumber = `INV-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, "0")}-${Math.floor(1000 + Math.random()* 9000)}`

      const htmlContent = generateInvoice(
        invoiceNumber,
        new Date(purchaseData.purchase.createdAt),
        purchaseData.asset.title,
        purchaseData.purchase.price
      )

      const [newInvoice] = await db.insert(invoice).values({
        id: uuid(),
        invoiceNumber,
        purchaseId: purchaseData.purchase.id,
        userId: purchaseData.user.id,
        amount: purchaseData.purchase.price,
        currency: "USD",
        status: "paid",
        htmlContent,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning()

      revalidatePath("/dashbaord/purchases")

      return {
        success: true,
        invoiceId: newInvoice.id
      }

  } catch (error) {
    console.error(error)
    return {
        success: false,
        error: "failed to create invoice"
    }
  }
}

export async function getUserInvoicesAction(){
    try {
          const session = await auth.api.getSession({
        headers: await headers()
      })
      if(!session?.user?.id){
       return {
        success: false,
        error: "Not authenticated"
       }
      }

      const userInvoices = await db.select().from(invoice).where(eq(invoice.userId, session.user.id)).orderBy(invoice.createdAt)

      return {
        success: true,
        invoices: userInvoices
      }

    } catch (error) {
        return {
            success: false,
            error: "failed to fetch users invoices"
        }
    }
}

export async function getInvoiceHtml(invoiceId: string){
    try {
               const session = await auth.api.getSession({
        headers: await headers()
      })
      if(!session?.user?.id){
       return {
        success: false,
        error: "Not authenticated"
       }
      }

      const [invoiceData] = await db.select().from(invoice).where(eq(invoice.id, invoiceId)).limit(1)

      if(!invoiceData){
        return {
            success: false,
            error: "invoice not found"
        }
      }

        if(invoiceData.userId !== session?.user.id && session.user.role !== "admin"){
        return {
            success: false,
            error: "Not authorized"
        }
      }

      if(!invoiceData.htmlContent){
        return {
            success: false,
            error: "Invoice html content not found"
        }
      }

      return {
        success: true,
        html: invoiceData.htmlContent
      }

    } catch (error) {
        console.error(error)
          return {
            success: false,
            error: "Invoice html content not found"
        }
    }
}

export async function getInvoiceById(invoiceId: string){
    try {
               const session = await auth.api.getSession({
        headers: await headers()
      })
      if(!session?.user?.id){
       return {
        success: false,
        error: "Not authenticated"
       }
      }

      const [invoiceData] = await db.select().from(invoice).where(eq(invoice.id, invoiceId)).limit(1)

      if(!invoiceData){
        return {
            success: false,
            error: "invoice not found"
        }
      }

        if(invoiceData.userId !== session?.user.id && session.user.role !== "admin"){
        return {
            success: false,
            error: "Not authorized"
        }
      }

      if(!invoiceData.htmlContent){
        return {
            success: false,
            error: "Invoice html content not found"
        }
      }

      return {
        success: true,
        invoice: invoiceData
      }

    } catch (error) {
        console.error(error)
          return {
            success: false,
            error: "Invoice not found"
        }
    }
}

