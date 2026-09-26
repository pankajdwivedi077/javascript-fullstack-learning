function describeTypeOf(x: unknown) {
  if (typeof x === "string") {
    return "string";
  }
  if (typeof x === "number") {
    return "number";
  }
  if (typeof x === "boolean") {
    return "boolean";
  }
  if (typeof x === "bigint") {
    return "bigint";
  }
  if (typeof x === "symbol") {
    return "symbol";
  }
  if (typeof x === "undefined") {
    return "undefined";
  }
  if (typeof x === "function") {
    return "function";
  }
  if (typeof x === null) {
    return "Object";
  }
  if (typeof x === "object") {
    return "object";
  }
}

console.log(
  describeTypeOf("h1"),
  describeTypeOf(23),
  describeTypeOf(true),
  describeTypeOf(10n),
  describeTypeOf(Symbol("bell")),
  describeTypeOf(undefined),
  describeTypeOf(() => {}),
  describeTypeOf(null),
  describeTypeOf({}),
);

function info(z: unknown){
  if(Array.isArray(z)){
    "array"
  }
  if(z instanceof Date){
    return "new date"
  }
  if(z instanceof Error){
    return "error"
  }
  return "other"
}

console.log(info([1,2]), info(new Date), info(new Error("error")), info({x:1}))