interface Guild {
  id: string;
  icon: string;
  name: string;
  owner: boolean;
  permissions: string;
}

declare const PermissionFlagsBits: {
  readonly CreateInstantInvite: bigint;
  readonly KickMembers: bigint;
  readonly BanMembers: bigint;
  readonly Administrator: bigint;
  readonly ManageChannels: bigint;
  readonly ManageGuild: bigint;
  readonly AddReactions: bigint;
  readonly ViewAuditLog: bigint;
  readonly PrioritySpeaker: bigint;
  readonly Stream: bigint;
  readonly ViewChannel: bigint;
  readonly SendMessages: bigint;
  readonly SendTTSMessages: bigint;
  readonly ManageMessages: bigint;
  readonly EmbedLinks: bigint;
  readonly AttachFiles: bigint;
  readonly ReadMessageHistory: bigint;
  readonly MentionEveryone: bigint;
  readonly UseExternalEmojis: bigint;
  readonly ViewGuildInsights: bigint;
  readonly Connect: bigint;
  readonly Speak: bigint;
  readonly MuteMembers: bigint;
  readonly DeafenMembers: bigint;
  readonly MoveMembers: bigint;
  readonly UseVAD: bigint;
  readonly ChangeNickname: bigint;
  readonly ManageNicknames: bigint;
  readonly ManageRoles: bigint;
  readonly ManageWebhooks: bigint;
  /**
   * @deprecated This is the old name for {@apilink PermissionFlagsBits#ManageGuildExpressions}
   */
  readonly ManageEmojisAndStickers: bigint;
  readonly ManageGuildExpressions: bigint;
  readonly UseApplicationCommands: bigint;
  readonly RequestToSpeak: bigint;
  readonly ManageEvents: bigint;
  readonly ManageThreads: bigint;
  readonly CreatePublicThreads: bigint;
  readonly CreatePrivateThreads: bigint;
  readonly UseExternalStickers: bigint;
  readonly SendMessagesInThreads: bigint;
  readonly UseEmbeddedActivities: bigint;
  readonly ModerateMembers: bigint;
  readonly ViewCreatorMonetizationAnalytics: bigint;
  readonly UseSoundboard: bigint;
  /**
   * @unstable This permission flag is currently not documented by Discord but has a known value which we will try to keep up to date.
   */
  readonly UseExternalSounds: bigint;
};

interface Role {
  id: string;
  name: string;
  description: string;
  color: number;
  [key: string]: any;
}

interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  bot: boolean;
  [key: string]: any;
}

interface Member {
  avatart?: string;
  joined_at: string;
  nick?: string;
  roles: string[];
  [key: string]: any;
  user: User;
}
