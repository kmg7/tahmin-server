import { Router } from 'express';

import {
  createFeature,
  createManyFeature,
  deleteFeature,
  deleteManyFeature,
  getAllFeatures,
  getFeature,
  getFeatureProperty,
  searchFeature,
  updateFeature,
  upsertFeature,
} from '../controller/feature_controller.js';
const router = Router();

router.route('/').get(getFeature).post(createFeature).put(updateFeature).delete(deleteFeature);
router.route('/many').get(getAllFeatures).post(createManyFeature).put(upsertFeature).delete(deleteManyFeature);
router.route('/:id/:prop').get(getFeatureProperty);
router.route('/search').get(searchFeature);

export default router;
