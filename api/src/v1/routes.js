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
router.get(`/${app.currentVersion}/search/details`, SearchController.detail);


router.post(`/${app.currentVersion}/ranking/`, RankingController.index); // in progress


export default router;
