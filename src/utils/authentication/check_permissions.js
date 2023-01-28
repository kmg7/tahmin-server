import { NODE_ENV } from '../../config.js';
import { FeaturePermissions, PermissionLevels } from './permissions.js';

export default async ({ feature, role, method }) => {
  if (NODE_ENV == 'development-no-auth') return true;
  return getRoleRight(method, FeaturePermissions[feature][role]);
};

const getRoleRight = (method, rights) => {
  if (!rights) return false;
  return PermissionLevels[rights][method];
};
