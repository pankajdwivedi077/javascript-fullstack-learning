import type { BunFile } from "bun";

async function fileSystemOperation(){

    // read a file
    const file: BunFile = Bun.file("read.txt");

    console.log(file.size);
    console.log(file.type);

    const extractTextContent = await file.text();     
    console.log(extractTextContent);

    const arrayBuffer = await file.arrayBuffer();
    const unit8Array = await file.bytes();

    console.log(arrayBuffer, " ", unit8Array);

    const content = "learning bun for first time";
    await Bun.write("output.txt", content);
    console.log("file created");

    const inputFile = Bun.file("read.txt");
    await Bun.write("read_copy.txt", inputFile);
    console.log("copied and created");

    const isFileExists = await Bun.file("read_copy.txt").exists();
    console.log(isFileExists);

    await Bun.file("read_copy.txt").delete();
    console.log("read copy deleted");

}

fileSystemOperation();