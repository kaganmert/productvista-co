import { http, HttpResponse } from 'msw';

import { env } from '../../config/env';

import { networkDelay } from '../utils';

import { authHandlers } from './authHandlers';
import { productHandlers } from './productHandlers';
import { commentHandlers } from './commentHandlers';

export const handlers = [
  ...authHandlers,
  ...productHandlers,
  ...commentHandlers,
  http.get(`${env.API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
