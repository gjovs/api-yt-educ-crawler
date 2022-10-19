import {
  Pandora
} from '../services';
import createResponse from '../helpers/createResponse';

class SearchController {

  async index(req, res) {
    const {
      q,
    } = req.query;

    if (!q) {
      return res.status(402).json({
        error: true,
        code: 402,
        message: ['Missing the query paramter']
      })
    }

    const playlists = await Pandora.getPlaylists(q);
    const videos = await Pandora.getVideos(q);

    if (!playlists && !videos) {
      return res.status(400).json({
        error: true,
        code: 400,
        message: ['This search parameter do not associated with any educated content']
      })
    }

    return res.status(200).json({
      error: false,
      code: 200,
      data: { playlists, videos }
    });

  }

  async detail(req, res) {
    const {
      q,
    } = req.query;

    if (!q) {
      return res.status(402).json({
        error: true,
        code: 402,
        message: ['Missing the query paramter']
      })
    }

    const response = await Pandora.details(q);

    return res.status(200).json({
      error: false,
      code: 200,
      data: response
    })
  }


}

export default new SearchController();
