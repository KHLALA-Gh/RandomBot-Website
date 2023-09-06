import axios from "axios";

/**
 * get a guild using the bot TOKEN
 * @returns Guild
 */
export async function getGuild(serverId: string): Promise<Guild> {
  if (!process.env.TOKEN) throw new Error(`Bot TOKEN is required`);
  const guild = (
    await axios.get(`https://discord.com/api/guilds/${serverId}`, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    })
  ).data;
  return guild;
}

/**
 * Get Bot commands from discord api using the bot token from .env
 */
export async function getCommands(): Promise<DiscordAPICommand[]> {
  if (!process.env.TOKEN) throw new Error(`Bot TOKEN is required`);
  if (!process.env.DC_ID) throw new Error(`Discord application id is required`);
  const response = await axios.get(
    `https://discord.com/api/applications/${process.env.DC_ID}/commands`,
    {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    }
  );
  return response.data as DiscordAPICommand[];
}

/**
 * Get guild roles from discord api using the bot token from .env
 * @param guildId discord server id
 */
export async function getGuildRoles(guildId: string): Promise<Role[]> {
  const res = await axios.get(
    `https://discord.com/api/guilds/${guildId}/roles`,
    {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    }
  );
  return res.data as Role[];
}
/**
 * Get guild memebers from discord api using the bot token from .env
 * @param guildId discord server id
 */
export async function getGuildMembers(guildId: string): Promise<Member[]> {
  if (!process.env.TOKEN) throw new Error(`Bot TOKEN is required`);
  const res = await axios.get(
    `https://discord.com/api/guilds/${guildId}/members?limit=1000`,
    {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    }
  );
  return res.data as Member[];
}

/**
 * Get a discord channel from discord api using the bot TOKEN from .env
 * @param id channel id
 */
export async function getChannel(id: string): Promise<Channel> {
  if (!process.env.TOKEN) throw new Error(`Bot TOKEN is required`);
  const res = await axios.get(`https://discord.com/api/channels/${id}`, {
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`,
    },
  });
  return res.data as Channel;
}

/**
 * Get a discord user from discord api using the bot TOKEN from .env
 * @param userId
 * @returns Discord user data
 */
export async function getUser(userId: string): Promise<User> {
  if (!process.env.TOKEN) throw new Error(`Bot TOKEN is required`);
  const res = await axios.get(`https://discord.com/api/users/${userId}`, {
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`,
    },
  });
  return res.data as User;
}
