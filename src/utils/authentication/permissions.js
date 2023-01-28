export const FeaturePermissions = {
  team: {
    sumod: 7,
    mod: 1,
  },
  tournament: {
    sumod: 7,
    mod: 1,
  },
  team: {
    sumod: 7,
    mod: 1,
  },
  standings: {
    sumod: 7,
    mod: 1,
  },
  stage: {
    sumod: 7,
    mod: 1,
  },
  score: {
    sumod: 7,
    mod: 1,
  },
  prediction: {
    sumod: 7,
    mod: 1,
  },
  moderator: {
    sumod: 7,
    mod: 1,
  },
  feature: {
    sumod: 7,
    mod: 1,
  },
  authority: {
    sumod: 7,
    mod: 1,
  },
  matchScore: {
    sumod: 7,
    mod: 1,
  },
  match: {
    sumod: 7,
    mod: 1,
  },
};

export const PermissionLevels = {
  7: {
    GET: true,
    PUT: true,
    POST: false,
    DELETE: true,
  },
  6: {
    GET: true,
    PUT: false,
    POST: true,
    DELETE: true,
  },
  5: {
    GET: true,
    PUT: true,
    POST: false,
    DELETE: true,
  },
  4: {
    GET: true,
    PUT: false,
    POST: false,
    DELETE: true,
  },
  3: {
    GET: true,
    PUT: true,
    POST: true,
    DELETE: false,
  },
  2: {
    GET: true,
    PUT: false,
    POST: true,
    DELETE: false,
  },
  1: {
    GET: true,
    PUT: true,
    POST: false,
    DELETE: false,
  },
};

export const Roles = {
  SUPERMOD: 'sumod',
  MOD: 'mod',
};
