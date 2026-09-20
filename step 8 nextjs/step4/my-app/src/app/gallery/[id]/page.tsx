import { Suspense } from "react";
import { CheckCircle, Download, Info, Loader2, ShoppingCart, Tag } from "lucide-react"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getAssetById } from "@/actions/dashboard-actions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createPaypalOrderAction, hasUserPurchasedAction } from "@/actions/payment-action";

interface GalleryDetailsProps{
    params: {
        id: string
    };
    searchParams: {
        success?: string;
        canceled?: string;
        error?: string
    }
}

export default function GalleryDetailsPage({params, searchParams}: GalleryDetailsProps){
        return <Suspense
         fallback={
            <div className="flex items-center justify-center min-h-[65vh]">
                <Loader2 className="h-8 w-8 animate-spin text-black" />
            </div>
         }
        >
         <GalleryContent params={params} searchParams={searchParams} />
        </Suspense>
}

async function GalleryContent({params, searchParams}: GalleryDetailsProps){

   const session = await auth.api.getSession({
    headers: await headers()
   })

   if(session && session?.user?.role === "admin"){
    redirect("/")
   }

   const result = await getAssetById(params.id)

   if(!result){
     return notFound();
   }

   const { asset, categoryName, userName, userImage, userId } = result
   const isAuthor = session?.user.id === userId
   const initials = userName? userName.split(" ").map(n=>n[0]).join("").toUpperCase(): "U"

   const hasPurchased = session?.user?.id
   ? await hasUserPurchasedAction(params.id) : false;

   async function handlePurchase(){
    "use server"
    const result = await createPaypalOrderAction(params.id)
    
    if(result.areadyPurchased){
        redirect(`/gallery/${params.id}?success=true`)
    }

    if(result.approvalLink){
        redirect(result.approvalLink)
    }

   }

   const success = searchParams.success;

   return (
    <div className="min-h-screen container px-4 bg-white">
        {
            success && (
                <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p>Purchase Successfull. now you can download</p>
                </div>
            )
        }
        <div className="container py-12">
            <div className="grid gap-12 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                    <div className="rounded-lg overflow-hidden bg-gray-100 border">
                        <div className="relative w-full">
                            <Image 
                             src={asset.fileUrl}
                             alt={asset.title}
                             width={1200}
                             height={800}
                             className="w-full h-auto object-contain"
                             priority
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{asset.title}</h1>
                            {
                                categoryName && (
                                    <Badge 
                                     className="mt-2 bg-gray-200 text-gray-700"
                                    >
                                        <Tag className="mr-1 h-4 w-4" />
                                        {categoryName}
                                    </Badge>
                                )
                            }
                        </div>
                        <div>
                            <p className="text-sm font-medium">{userName}</p>
                            <p className="text-xs text-gray-500">Creator</p>
                        </div>
                    </div>
                </div>
                <div className=" space-y-6">
                    <div className="sticky top-24">
                        <Card className="overflow:hidden border-0 shadow-lg rounded-xl" >
                            <div className="bg-gradient-to-r from_gray-900 to-gray-800 p-6 text-white">
                                <h3 className="text-xl font-bold mb-2">Premium Asset</h3>
                                <div>
                                    <span className="text-3xl font-bold">$5.00</span>
                                    <span className="mt-2 text-gray-300">One Time Purchase</span>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <a href={`/api/download/${params.id}`}>Download Asset
                                        <Download  className="mr-2 w-6 h-6" />
                                    </a>
                                    {
                                        session?.user ? isAuthor ? <div className="bg-blue-50 text-blue-700 p-5 rounded-lg flex items-start gap-3">
                                            <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" /> <p className="text-sm">This is your own asset.</p>
                                        </div> : <form action={handlePurchase} >
                                            <Button type="submit" className="w-full bg-black text-white">
                                                <ShoppingCart className="mr-2 w-5 h-6" />
                                                Purchase Now
                                            </Button>
                                        </form> : (
                                            <>
                                            <Button className="w-full bg-black text-white h-12">
                                                <Link href="/login">Sign in to Purchase</Link>
                                            </Button>
                                            </>
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
}