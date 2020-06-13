
import * as dotenv from 'dotenv';
import { ENV } from '../../../interfaces/index';
import { camelCase2UpperCaseLine } from '../../../utils/stringUtils';
import { readFileSync } from 'fs';
import * as Joi from 'joi';
import * as path from 'path';

export interface EnvConfig {
  env: ENV;
  [key: string]: string;
}
let envConfig: EnvConfig | null = null;

function init() {
  if (envConfig) {
    return;
  }
  const { NODE_ENV ='dev' } = process.env;
  envConfig = {
    ...dotenv.parse(readFileSync(`${process.cwd()}/env/${NODE_ENV}.env`)),
    env: NODE_ENV,
  } as EnvConfig;
}
/**
 * load config by env
 */
export class ConfigService {
  // private readonly envConfig: EnvConfig

  constructor() {
    init()
  }
  validate(config: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().required(),
      HOST: Joi.string().required(),
      PORT: Joi.number().required(),
      USERNAME: Joi.string().required(),
      PASSWORD: Joi.string().required(),
      DATABASE: Joi.string().required(),
      LOG_PATH: Joi.string().required(),
      AK: Joi.string().required(),
      SK: Joi.string().required(),
      ZONE: Joi.string().required(),
      BUCKET: Joi.string().required(),
    })

    const { error, value: validatedEnvConfig } = Joi.validate(config, envVarsSchema)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    console.info(`at present env is ${config.NODE_ENV}`)
    return validatedEnvConfig
  }
  static getEnv(): ENV {
    return envConfig ? envConfig.env : (init(), envConfig!.env);
  }

  get(key: string): string {
    return ConfigService.get(key)
  }

  static get(key: string): string {
    return envConfig ? envConfig[camelCase2UpperCaseLine(key)] : (init(),
      envConfig![camelCase2UpperCaseLine(key)]);
  }
}
