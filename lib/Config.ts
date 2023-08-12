import mongoose from "mongoose";
import { connectDB } from "./connectDB";
import { getServer } from "./Servers";
import { getGuildRoles } from "./discordApiUtils";

export const PermissionFlagsBits = [
  "CreateInstantInvite",
  "KickMembers",
  "BanMembers",
  "Administrator",
  "ManageChannels",
  "ManageGuild",
  "AddReactions",
  "ViewAuditLog",
  "PrioritySpeaker",
  "Stream",
  "ViewChannel",
  "SendMessages",
  "SendTTSMessages",
  "ManageMessages",
  "EmbedLinks",
  "AttachFiles",
  "ReadMessageHistory",
  "MentionEveryone",
  "UseExternalEmojis",
  "ViewGuildInsights",
  "Connect",
  "Speak",
  "MuteMembers",
  "DeafenMembers",
  "MoveMembers",
  "UseVAD",
  "ChangeNickname",
  "ManageNicknames",
  "ManageRoles",
  "ManageWebhooks",
  "ManageEmojisAndStickers",
  "ManageGuildExpressions",
  "UseApplicationCommands",
  "RequestToSpeak",
  "ManageEvents",
  "ManageThreads",
  "CreatePublicThreads",
  "CreatePrivateThreads",
  "UseExternalStickers",
  "SendMessagesInThreads",
  "UseEmbeddedActivities",
  "ModerateMembers",
  "ViewCreatorMonetizationAnalytics",
  "UseSoundboard",
  "UseExternalSounds",
];

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

export function isCommand(obj: any): obj is Command {
  if (
    Object.keys(obj || {})?.length === 2 &&
    typeof obj?.name === "string" &&
    typeof obj?.enable === "boolean"
  )
    return true;
  return false;
}

export function isCommandConfig(obj: any): obj is Omit<CommandConfig, "name"> {
  if (
    obj &&
    Object.keys(obj || {}).length === 4 &&
    typeof obj.enable === "boolean" &&
    obj.permissions instanceof Array &&
    obj.rolesId instanceof Array &&
    obj.bannedUsers instanceof Array
  ) {
    if (obj.permissions.length > PermissionFlagsBits.length) return false;
    for (let i = 0; i < obj.permissions.length; i++) {
      if (typeof obj.permissions[i] !== "string") return false;
      if (PermissionFlagsBits.indexOf(obj.permissions[i]) === -1) return false;
    }
    for (let i = 0; i < obj.rolesId.length; i++) {
      if (typeof obj.rolesId[i] !== "string") return false;
    }
    for (let i = 0; i < obj.bannedUsers.length; i++) {
      if (typeof obj.bannedUsers[i] !== "string") return false;
    }
    return true;
  }
  return false;
}

export async function updateCommandConfig(
  serverId: string,
  name: string,
  command: Omit<CommandConfig, "name">
) {
  if (!mongoose.connection.db) {
    await connectDB();
  }
  const collection = mongoose.connection.db.collection("discord servers");
  const server = await collection.findOne({ serverId });
  if (!server) throw new Error(`server with id=${serverId} is not found`);
  for (let i = 0; i < server.config?.commands?.length; i++) {
    if (server.config?.commands[i]?.name === name) {
      server.config.commands[i] = {
        name: name,
        enable: command.enable,
        permissions: command.permissions,
        rolesId: command.rolesId,
        bannedUsers: command.bannedUsers,
      } satisfies CommandConfig;
      await collection.updateOne({ serverId }, { $set: { ...server } });
      return;
    }
  }
  throw new Error(
    `command with name=${name} is not found in server id=${serverId}`
  );
}

export function isQuizConfig(configName: keyof QuizConfig, data: any): boolean {
  if (configName === "customGames") {
    if (typeof data === "boolean") return true;
    return false;
  } else if (configName === "gameStart") {
    if ([0, 1, 2, 3].indexOf(data) !== -1) return true;
    return false;
  } else if (configName === "multiple_channels") {
    if (typeof data !== "object") return false;
    if (!(Object.keys(data).length >= 2 && Object.keys(data).length <= 4))
      return false;
    if (typeof data.enable !== "boolean" || typeof data.private !== "object")
      return false;
    if (
      data.category_name !== undefined &&
      typeof data.category_name !== "string"
    )
      return false;
    if (data.category_id !== undefined && typeof data.category_id !== "string")
      return false;
    if (Object.keys(data.private).length !== 2) return false;
    if (
      typeof data.private.enable !== "boolean" ||
      !(data.private.viewChannel instanceof Array)
    )
      return false;
    for (let i = 0; i < data.private.viewChannel.length; i++) {
      if (typeof data.private.viewChannel[i] !== "string") return false;
    }
    return true;
  } else if (configName === "roles") {
    if (!(data instanceof Array)) return false;
    if (data.length > 1000) return false;
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] !== "object") return false;
      if (!data[i]) return false;
      if (
        Object.keys(data[i]).length !== 2 &&
        Object.keys(data[i]).length !== 3
      )
        return false;

      if (typeof data[i].id !== "string" || !data[i].id) return false;
      if (
        typeof data[i].gamesPerUser !== "number" ||
        isNaN(data[i].gamesPerUser)
      )
        return false;
      if (
        Object.keys(data[i]).length === 3 &&
        typeof data[i].playQzgame !== "boolean"
      )
        return false;
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (i === j) continue;
        if (data[i].id === data[j].id) return false;
      }
    }
    return true;
  }
  return false;
}
