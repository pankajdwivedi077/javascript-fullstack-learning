import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { asset, category, purchase, user } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";
import { recordPurchaseAction } from "@/actions/payment-action";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const assetId = searchParams.get("assetId");
  const payerId = searchParams.get("PayerId");

  if(!token || !payerId || !assetId){
    return NextResponse.redirect(new URL(`/gallery?error=missing-params`, request.url))
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user.id) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const response = await fetch(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`, {
        method: "POST",
          headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`
            },
    })

    const data = await response.json()
    console.log(data, "paypal capture")

    if(data.status === "COMPLETED"){
        // store the purchase info in our db
        const saveToDb = await recordPurchaseAction(assetId, token, session.user.id, 5.0)
        if(!saveToDb.success){
            return NextResponse.redirect(new URL(`/gallery/${assetId}?error=recording_failed`, request.url))
        }
          return NextResponse.redirect(new URL(`/gallery/${assetId}?success=true`, request.url))
    }else{
        return NextResponse.redirect(new URL(`/gallery/${assetId}?error=payment_failed`, request.url))
    }

  } catch (error) {
    console.error(error)
     return NextResponse.redirect(new URL(`/gallery/${assetId}?error=server_error`, request.url))
  }
}
