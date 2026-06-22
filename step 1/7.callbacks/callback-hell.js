const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("error reading file", err);
    return;
  }
  const modifyData = data.toUpperCase();
        fs.writeFile("output.txt", modifyData, (err) => {
            if (err) {
            console.log("error writing file", err);
            return;
            }
            console.log("data writtrn to new file")
        });
});
// check