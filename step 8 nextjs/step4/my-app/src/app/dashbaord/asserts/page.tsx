import { getAllCategories, getUserAssets } from "@/actions/dashboard-actions";
import AssertGrid from "@/components/dashboard/assert-grid";
import UploadAssert from "@/components/dashboard/upload-assert";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function UsersAssertsPage(){

      const session = await auth.api.getSession({
        headers: await headers()
      })
      
      if(!session?.user){
        throw new Error("You must be logged in to upload asset")
      }

    const [categories, assets] = await Promise.all([getAllCategories(), getUserAssets(session?.user.id)])

    return (
        <div className="container py-6">
           <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold">My Assets</h1>
            <UploadAssert categories={categories || []} />
           </div>
           <AssertGrid asset={assets} />
        </div>
    )
}