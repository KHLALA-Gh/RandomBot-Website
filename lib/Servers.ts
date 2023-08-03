import mongoose from "mongoose";
import { connectDB } from "./connectDB";
import axios from "axios";

export async function getServer(guildId: string): Promise<Server | undefined> {
  if (!mongoose.connection.db) {
    await connectDB();
  }
  const server = await mongoose.connection.db
    .collection("discord servers")
    .findOne({ serverId: guildId });
  //@ts-ignore
  return server as Server | undefined;
}

export async function getUserGuilds(accessToken: string): Promise<Guild[]> {
  const { data } = await axios.get(
    `https://discord.com/api/v9/users/@me/guilds`,
    { headers: { Authorization: "Bearer " + accessToken } }
  );
  return data as Guild[];
}

export async function getGuildByUser(
  accessToken: string,
  guildId: string
): Promise<Guild | undefined> {
  const guilds = await getUserGuilds(accessToken);
  return guilds.filter((e) => e.id === guildId)[0];
}

export async function updateServer(id: string, server: Server) {
  if (mongoose.connection.db) {
    await connectDB();
  }
  await mongoose.connection.db
    .collection("discord servers")
    .updateOne({ serverId: id }, { $set: { ...server } });
}
