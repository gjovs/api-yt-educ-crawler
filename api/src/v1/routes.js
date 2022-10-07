import {
  Router,
} from 'express';

import {
  app,
} from './configs';

import SearchController from './controllers/SearchController';
import RankingController from './controllers/RankingController';

const router = Router();

// SEARCH ROUTE
router.get(`/${app.currentVersion}/search/`, SearchController.index);

router.post(`/${app.currentVersion}/ranking/`, RankingController.index);


export default router;
