export const FeaturePermissions = {
  sumod: {
    team: 8,
    tournament: 8,
    standings: 8,
    country: 8,
    stage: 8,
    score: 8,
    prediction: 8,
    moderator: 8,
    feature: 8,
    authority: 8,
    matchScore: 8,
    match: 8,
  },
  mod: {
    team: 1,
    tournament: 1,
    country: 1,
    standings: 1,
    stage: 1,
    score: 1,
    prediction: 1,
    matchScore: 1,
    match: 1,
  },
};

export const PermissionLevels = {
  8: {
    GET: true,
    PUT: true,
    POST: true,
    DELETE: true,
  },
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
    PUT: false,
    POST: false,
    DELETE: true,
  },
  4: {
    GET: true,
    PUT: true,
    POST: true,
    DELETE: false,
  },
  3: {
    GET: true,
    PUT: true,
    POST: false,
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
    PUT: false,
    POST: false,
    DELETE: false,
  },
};

export const Roles = {
  SUPERMOD: 'sumod',
  MOD: 'mod',
};
