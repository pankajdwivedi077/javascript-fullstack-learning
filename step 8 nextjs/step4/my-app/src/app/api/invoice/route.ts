import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { asset, category, purchase, user } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { hasUserPurchasedAction, recordPurchaseAction } from "@/actions/payment-action";
import { getAssetById } from "@/actions/dashboard-actions";
import { getInvoiceHtml } from "@/actions/invoice-actions";

export async function GET(request: NextRequest, {
    params
}: {params: Promise<{ id: string }>}){
    const asset = (await params).id;
    try {
            const session = await auth.api.getSession({
              headers: await headers(),
            });
        
            if (!session?.user.id) {
              return NextResponse.redirect(new URL('/login', request.url))
            }
            const result = await getInvoiceHtml(asset)
            if(!result.success || !result.html){
                 return NextResponse.redirect(new URL(`dashbaord/purchases`, request.url));
            }

             return new NextResponse(result.html, {
                headers: {
                    'Content-Type': "text/html"
                }
             })
           
    } catch (error) {
           return NextResponse.redirect(new URL(`dashbaord/purchases`, request.url));
    }
}