const fs = require("fs");
const zib = require("zlib") // used from compression
const crypto = require("crypto");
const { Transform } = require("stream")

class EncryptStream extends Transform{

    constructor(key,vector){
        super()
        this.key = key
        this.vector = vector
    }

    _transformD(chunk, encoding, callback){
        const cipher = crypto.createCipheriv("aes-256-cbc", this.key, this.vector)
        const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]) // encrypt the chunk
        this.push(encrypted)
        callback()
    }
}

const key = crypto.randomBytes(32) // create 32 byte key
const vector = crypto.randomBytes(16) // create vector

const readableStream = fs.createReadStream("input.txt")

// create new gzip object to compress the stream of data
const gzipStream = zib.createGzip();

const encryptStream = new EncryptStream(key,vector);

const writeableStream = fs.createWriteStream("output.txt.gz.enc");

// read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writeableStream);
console.log("streaming -> compressing -> writing data");