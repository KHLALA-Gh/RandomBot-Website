import mongoose from "mongoose";
import { connectDB } from "./connectDB";

/**
 * Gets the config structure from the database
 * @param version RandomBot Version
 */
export async function getGeneralConfig(version: string) {
  if (!mongoose.connection.db) {
    await connectDB();
  }
  const config: any = await mongoose.connection.db
    .collection("Config")
    .findOne({ version });
  if (!config)
    throw new Error(`General config for version ${version} is not found`);
  return config as GeneralConfig;
}
