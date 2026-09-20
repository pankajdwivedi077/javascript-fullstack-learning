export function generateInvoice(invoiceNumber: string, purchaseData: Date, assetTitle: string, price: number): string{

  const formattedDate = purchaseData.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const formattedPrice = (price/100).toFixed(2)

  return `
   <!DOCTYPE html>
   <html>
    <head>
     <meta charset="utf-8 >
     <title>InvoiceNumber ${invoiceNumber}</title>
    </head>
    <body>
     <div>
        <div>${invoiceNumber}</div>
        <div>${assetTitle}</div>
         <div>price: ${formattedPrice}</div>
        <div>Date: ${formattedDate}</div>
     </div>
    </body>
   </html>
  `
}