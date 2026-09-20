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
            const hasPurchased = await hasUserPurchasedAction(asset)
            if(!hasPurchased){
                return NextResponse.redirect(new URL(`gallery/${asset}`, request.url));
            }
            const result = await getAssetById(asset);
            if(!result){
                return NextResponse.redirect(new URL(`gallery`, request.url));
            }
            return NextResponse.redirect(result?.asset.fileUrl)
    } catch (error) {
            return NextResponse.redirect(new URL(`gallery/${asset}`, request.url));
    }
}