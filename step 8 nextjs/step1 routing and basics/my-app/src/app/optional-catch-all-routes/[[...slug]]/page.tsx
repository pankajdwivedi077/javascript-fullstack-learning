export default async function Optional({ params }: { params: Promise<{ slug?: string[] }> } ){
    
    const {slug} = await params;
    console.log(slug);
  return (
  <div>
    <h1>Products filter</h1>
  </div> 
  )
}