export interface IAppSettings {
  readonly port: number;
  readonly body_limit: string;
  readonly body_parameter_limit: number;
}

export interface IAppMicroserviceSettings {
  readonly port: number;
  readonly host: string;
}

export interface IMicroserviceSettings extends IAppMicroserviceSettings {
  readonly name: string;
}

export interface ILogSettings {
  readonly level: string;
  readonly silence: string[];
}

export interface ICorsSettings {
  readonly allowed_origins: string[];
  readonly allowed_paths: string[];
  readonly allowed_methods: string[];
  readonly allowed_credentials: boolean;
  readonly allowed_headers: string[];
}
