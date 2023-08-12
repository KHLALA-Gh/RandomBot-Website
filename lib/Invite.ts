interface InviteLinkOptions {
  guildId?: string;
  origin: string;
}

/**
 * Creates an invite url for RandomBot
 */
export function createInviteLink({ guildId, origin }: InviteLinkOptions) {
  return `${origin}/invite?${guildId ? `guild_id=${guildId}` : ""}`;
}
