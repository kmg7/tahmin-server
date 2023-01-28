import * as english from './locales/en.js';

const locales = { en: english };

export const getMessage = ({ locale, layer, code }) => {
  if (!locales.hasOwnProperty(locale)) locale = 'en';
  if (!layer) layer = ErrorLayers.internal;
  if (layer == ErrorLayers.internal) return locales[locale].INTERNAL;

  return locales[locale][layer][code];
};

export const ErrorLevels = {
  expected: 'EXPECTED',
  critical: 'CRITICAL',
};

export const ErrorLayers = {
  internal: 'INTERNAL',
  database: 'DATABASE',
  service: 'SERVICE',
  auth: 'AUTH',
  server: 'SERVER',
};
