type Direction = "left" | "right" | "up";

function move(d:Direction){
    console.log(d)
}

const d1 = "left" // ts keeps literal type "left"
move(d1);

let d2 = "left"; // ts widens to string
// move(d2)  // because let can be changed so ts will not will this

let d3 : Direction = "left" // this works because ts know this d3 is direction type
move(d3)