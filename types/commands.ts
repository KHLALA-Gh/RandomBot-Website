interface Command {
  name: string;
  enable: boolean;
}

interface CommandConfig extends Command {
  permissions: (keyof typeof PermissionFlagsBits)[];
  rolesId: string[];
  bannedUsers: string[];
}

interface DiscordAPICommand {
  name: string;
  type: number;
  required: boolean;
  description: string;
  [key: string]: any;
  options?: {
    name: string;
    description: string;
    type: number;
    [key: string]: any;
    choices?: {
      name: string;
      value: any;
      [key: string]: any;
    }[];
  }[];
}

type CommandInfo = Pick<DiscordAPICommand, "name" | "description">;
