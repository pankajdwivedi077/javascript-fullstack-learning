import mongoose,{ Document } from "mongoose";

interface Iuser extends Document {
  name: string,
  email: string,
  age: number
}

const Typescript = new mongoose.Schema<Iuser>({
  name: String,
  email: String,
  age: Number
}, {timestamps: true})

const User = mongoose.model<Iuser>("Type", Typescript);

export { User, Iuser }