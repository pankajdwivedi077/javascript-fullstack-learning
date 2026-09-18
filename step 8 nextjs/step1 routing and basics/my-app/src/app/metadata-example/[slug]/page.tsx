import { Metadata } from "next";

const dummyData = {
    "1": {
        title: "One"
    },
    "2": {
        title: "Two"
    }
}

// dynamic metadata
export async function generateMetadata({ params }: {
     params: Promise<{ slug: string }>
}):  Promise<Metadata> {
  const {slug} = await params;
  const data = dummyData[slug as keyof typeof dummyData]
  return {
    title: data.title,
    description: data.title
  }
}

export default async function DynamicMetadataExample({ params }: {
    params: Promise<{ slug: string }>
}  ){

    const { slug } = await params;
    const data = dummyData[slug as keyof typeof dummyData]

    return(
      <div>
        <h1>{data.title}</h1>
      </div>
    )
}