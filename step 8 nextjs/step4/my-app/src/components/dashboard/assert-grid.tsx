import Image from "next/image";
import { Badge } from "../ui/badge";

type Asset = {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    isApproved: string;
    categoryId: number | null;
    createdAt: Date
}

interface AssertGridProps {
    asset: Asset[]
}

export default function AssertGrid({ asset }: AssertGridProps){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                asset.map(a => (
                    <div key={a.id} className="border rounded-lg overflow-hidden bg-white  shadow-sm hover:shadow transition-shadow">
                        <div className="h-48 bg-slate-100 relative">
                            <Image src={a.fileUrl} alt={a.title} fill className="object-contain" />
                            <div className="absolute top-2 right-2">
                                <Badge className={
                                    a.isApproved === "approved" ? "bg-teal-500" :
                                    a.isApproved === "reject" ? "bg-red-500" : "bg-yellow-500"
                                } variant="default" >
                                     {
                                        a.isApproved === "approved" ? "Approved" :
                                        a.isApproved === "rejected" ? "Rejected" : "pending"
                                     }
                                </Badge>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium truncate">{a.title}</h3>
                            {
                                a.description && (
                                    <p className="text-xs text-slate-500">{a.description}</p>
                                )
                            }
                            
                        </div>
                    </div>
                ))
            }
        </div>
    )
}