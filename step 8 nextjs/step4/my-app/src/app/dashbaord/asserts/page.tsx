import { getAllCategories } from "@/actions/dashboard-actions";
import AssertGrid from "@/components/dashboard/assert-grid";
import UploadAssert from "@/components/dashboard/upload-assert";

export default async function UsersAssertsPage(){

    const [categories] = await Promise.all([getAllCategories()])

    return (
        <div className="container py-6">
           <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold">My Assets</h1>
            <UploadAssert categories={categories || []} />
           </div>
           <AssertGrid />
        </div>
    )
}