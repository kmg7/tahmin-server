import { Router } from 'express';

import {
  createAuthority,
  createManyAuthority,
  deleteAuthority,
  deleteManyAuthority,
  getAllAuthority,
  getAuthority,
  getAuthorityProperty,
  searchAuthority,
  updateAuthority,
  upsertAuthority,
} from '../controller/authority_controller.js';
const router = Router();

router.route('/').get(getAuthority).post(createAuthority).put(updateAuthority).delete(deleteAuthority);
router.route('/many').get(getAllAuthority).post(createManyAuthority).put(upsertAuthority).delete(deleteManyAuthority);
router.route('/:id/:prop').get(getAuthorityProperty);
router.route('/search').get(searchAuthority);

export default router;
