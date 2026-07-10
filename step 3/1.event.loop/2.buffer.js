// objects that handle binary data
// file system op, cryptotography, image processing (use of)

const buffOne = Buffer.alloc(10); // allocate a buffer of 10 byte -> initialize with 0
console.log(buffOne);

const bufferString = Buffer.from("rajesh");
console.log(bufferString);

const bufferFromArray = Buffer.from([1,2,])
console.log(bufferFromArray);

buffOne.write("Node js")
console.log("bufferOne", buffOne.toString());

console.log("read single byte from buffer", bufferString[0]);

console.log(bufferString.slice(0,3));

const concatBuff = Buffer.concat([buffOne, bufferString])
console.log(concatBuff);

console.log("convert buffer to json ", buffOne.toJSON());