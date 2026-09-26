// interface best for object shapes that you expect to extend
// supports declaration merging

// types more general -> object, union, intersection, functions
// can not be reopened -> no merging

interface Box1{
    width: number;
}

interface Box1{
    height: number
}

const boxDemo: Box1 = {
    width: 10,
    height: 10
}

// type Bag = {  // error cann't redeclare type alias name
//     size: number;
// }

// type Bag = {
//     color: string
// }

