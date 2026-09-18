export default async function ProductDetails({ params }: { params: Promise<{ slug: string }> } ){

    const { slug } = await params;

    return (
        <h1>Product Details page ${slug}</h1>
    )
}