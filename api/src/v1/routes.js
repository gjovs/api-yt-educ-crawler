import {
  Router,
} from 'express';

import {
  app,
} from './configs';
import SearchController from './controllers/SearchController';

const router = Router();

// SEARCH ROUTE
router.get(`/${app.currentVersion}/search/`, SearchController.index);

export default router;
