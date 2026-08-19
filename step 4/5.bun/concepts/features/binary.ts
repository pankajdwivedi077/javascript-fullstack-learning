function binaryDataOperation(){

   const buf = new ArrayBuffer(8);
   console.log("arraybuffer size ", buf.byteLength);

   const dv = new DataView(buf);
   dv.setUint8(0,3);
   dv.setUint16(1,513);

   console.log(dv.getUint8(0));
   console.log(dv.getUint16(1));

   const unit8Array = new Uint8Array([0,1,2,3,4]);
   console.log(unit8Array);

   const nodeBuffer = Buffer.from("Hello");
   console.log(nodeBuffer, nodeBuffer.toString());

   const blog = new Blob(["<html>Hello</html>"], {type: "text/html"});
   console.log(blog.size, blog.type);

   const encoder = new TextEncoder();
   const encodedVal = encoder.encode("hello bun");
   console.log(encodedVal);

   const decoder = new TextDecoder();
   console.log(decoder.decode(encodedVal));

}

binaryDataOperation();