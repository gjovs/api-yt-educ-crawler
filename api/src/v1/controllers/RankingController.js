import validateRankingQueries from '../helpers/validateRankingQueries';

import {
  Eros
} from '../services';

import {
  app
} from '../configs';

import createResponse from '../helpers/createResponse';

class RankingController {

  async index(req, res) {
    const {
      q,
    } = req.query;

    const {
      playlists,
    } = req.body;


    if (!q) {
      return res.status(400).json(createResponse(400, ["Bad Request missing the query parameter"], true))
    }

    if (!playlists) {
      return res.status(400).json(createResponse(400, ["Bad Request missing the body values"], true))
    }

    if (!validateRankingQueries(q)) {
      return res.status(400).json(createResponse(400, ["Invalid Querie Parameter"], true))
    }

    let ranking;

    if (q === 'views') {
      ranking = await Eros.rankingByViews(playlists)
    }
    if (q === 'relevance') {
      ranking = await Eros.rankingByRelevance(playlists)
    }

    return res.status(200).json({
      status: 200,
      response: {
        ranking,
      },
      error: false,
    });
  }


}

export default new RankingController()
