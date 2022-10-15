import {
  Pandora
} from '../services';
import createResponse from '../helpers/createResponse';

class SearchController {

  async index(req, res) {
    const {
      q,
    } = req.query;

    const playlists = await Pandora.getPlaylists(q);
    const videos = await Pandora.getVideos(q);
    return res.status(200).json(createResponse(200, {
      playlists,
      videos
    }, false));

  }

  async detail(req, res) {
    const {
      q,
    } = req.query;

    const response = await Pandora.details(q);

    return res.status(200).json(response)
  }


}

export default new SearchController();
