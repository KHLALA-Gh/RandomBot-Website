import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.DB) throw new Error("DB url is not defined");
  await mongoose.connect(process.env.DB as string);
}
