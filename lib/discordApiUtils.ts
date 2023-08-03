import axios from "axios";

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
