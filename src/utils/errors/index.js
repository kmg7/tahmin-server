import * as english from './locales/en.js';

const locales = [{ en_US: english }];

export const getMessage = ({ locale, layer, code }) => {
  if (locale in locales) return locales[locale][layer][code];
  return english[layer][code];
};

export const en = english;
