import { Metadata } from "next"
import Link from "next/link"

//Static metadata
export const metadata: Metadata = {
   title: "Betu",
   description: "Learning static metadata"
}

export default function MetaDataExample(){

    const examples = [
        {
            id: 1,
            tiitle: "One"
        },
        {
            id: 2,
            tiitle: "Two"
        },
    ]

    return (
        <div>
            <h1>MetaData examples</h1>
            <ul>
                {examples.map(item=>(
                    <li key={item.id}>
                      <Link href={`/metadata-example/${item.id}`}>{item.tiitle}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}