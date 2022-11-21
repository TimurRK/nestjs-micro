import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { cors_not_allowed } from '@shared/errors';
import { getOrigin, getPath, getMethod } from '@shared/helpers/req.helper';
import { ICorsSettings } from '@shared/types';

import config from 'config';
import { Request } from 'express';

const cors_settings = config.get<ICorsSettings>('CORS_SETTINGS');

export const cors_options_delegate: unknown = (req: Request, callback: (err: Error, options: CorsOptions) => void) => {
  const cors_options: CorsOptions = {
    methods: cors_settings.allowed_methods,
    credentials: cors_settings.allowed_credentials,
    origin: false,
  };

  let error: Error | null = cors_not_allowed({ raise: false }, false);

  const origin = getOrigin(req);
  const url = getPath(req);
  const method = getMethod(req);

  if (
    (!cors_settings.allowed_methods.length || cors_settings.allowed_methods.indexOf(method) !== -1) &&
    (!origin || !cors_settings.allowed_origins.length || cors_settings.allowed_origins.indexOf(origin) !== -1) &&
    (!cors_settings.allowed_paths.length || cors_settings.allowed_paths.indexOf(url) !== -1)
  ) {
    cors_options.origin = true;
    error = null;
  }

  callback(error, cors_options);
};
