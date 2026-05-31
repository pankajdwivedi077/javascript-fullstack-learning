const fs = require('fs')
const path = require('path')

const datafolder = path.join(__dirname, 'data');


if (!fs.existsSync(datafolder)){
   fs.mkdirSync(datafolder)
   console.log("data folder created")
}

const filePath = path.join(datafolder, 'example.txt')
// sync way of creating the file
fs.writeFileSync(filePath, 'hello from node.js')
console.log("file created successfully")

// read content from file

const readContent = fs.readFileSync(filePath, "utf-8")
console.log("file ", readContent)

fs.appendFileSync(filePath, '\n This is new line')
console.log("new file content added")

// async way of creating file
const asyncFilePath = path.join(datafolder, "async-example.txt");
fs.writeFile(asyncFilePath, "Hello async nodejs", (err) => {
    if (err) throw err;
    console.log("Async file is created")

    fs.readFile(asyncFilePath, "utf-8", (err, data) => {
        if (err) throw err;
        console.log("async file content", data)

        fs.appendFile(asyncFilePath, "\n This new", (err) => {
            if (err) throw err;
            console.log("new line added")

            fs.readFile(asyncFilePath, "utf-8", (err, updatedData) => {
                if (err) throw err;
                console.log("data ", updatedData)
            })

        })
    })

})