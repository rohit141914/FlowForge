// keepAlive.js — prevents free-tier backend from sleeping

import { pingBackend } from './api';

const PING_INTERVAL_MS = 4 * 60 * 1000; // every 4 minutes

export const keepBackendAlive = () => {
  pingBackend().catch(() => {});
  return setInterval(() => pingBackend().catch(() => {}), PING_INTERVAL_MS);
};
