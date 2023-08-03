interface Config {
  quiz: QuizConfig;
  commands: CommandConfig[];
}

interface GeneralConfig {
  version: string;
  commands: string[];
}

type QuizGeneralConfigType =
  /** this type of config can be true or false*/
  | "boolean"
  /**This type of config is a discord role id */
  | "role"
  /**This type of config is an id (type string)*/
  | "id"
  /** This type of config is a string*/
  | "string"
  /**This type of config is a number */
  | "number"
  /**This type of config can be array*/
  | "container"
  /** This type of config has sub configurations */
  | "object";

type QuizGeneralConfig<ConfigT extends QuizGeneralConfigType> = {
  key: string;
  name: string;
  configType: ConfigT;
  data: any[] | string | number | boolean | object | `${number}`;
};
