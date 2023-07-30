interface Command {
  name: string;
  enable: boolean;
}

interface CommandConfig extends Command {
  permissions: (keyof typeof PermissionFlagsBits)[];
  rolesId: string[];
  bannedUsers: string[];
}
