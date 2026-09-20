import { approveAssetAction, getPendingAssetsAction, rejectAssetAction } from "@/actions/admin-actions"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";

export default async function AssertApprovalPage(){

    const pendingAssets = await getPendingAssetsAction();

    return pendingAssets.length === 0 ? (
       <Card className="bg-white">
        <CardContent className="py-16 flex flex-col items-center justify-center">
            <p className="text-center text-slate-500 text-lg">All assets have been reviewed</p>
        </CardContent>
       </Card>
    ): ( 
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        pendingAssets.map(({asset: a, userName}) => (
                            <div key={a.id} className="border rounded-lg overflow-hidden bg-white  shadow-sm hover:shadow transition-shadow">
                                <div className="h-48 bg-slate-100 relative">
                                    <Image src={a.fileUrl} alt={a.title} fill className="object-contain" />
                                    
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium truncate">{a.title}</h3>
                                    {
                                        a.description && (
                                            <p className="text-xs text-slate-500">{a.description}</p>
                                        )
                                    }
                                    <div className="flex items-center text-x text-slate-500">
                                        <User className="mr-2 w-4 h-4" />
                                        {userName}
                                    </div>
                                </div>
                                <div className="p-4 flex justify-between items-center">
                                    <form 
                                    action={async()=> {
                                        "use server"
                                        await approveAssetAction(a.id)
                                    }}>
                                        <Button  className="bg-teal-500 hover:bg-teal-600">Approve</Button>
                                    </form>
                                    <form 
                                     action={async()=> {
                                        "use server"
                                        await rejectAssetAction(a.id)
                                    }}
                                    >
                                         <Button className="bg-red-500 hover:bg-red-500">Reject</Button>
                                    </form>
                                </div>
                            </div>
                        ))
                    }
                </div>
     )
}