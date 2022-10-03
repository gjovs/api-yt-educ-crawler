import Pandora from '../services/pandora';

class SearchController {
  async index(req, res) {

    const {
      q,
    } = req.query;


    const playlists = await Pandora.getPlaylists(q);
    const videos = await Pandora.getVideos(q);


    return res.status(200).json({
      status: 200,
      response: {
        playlists,
        videos
      },
      error: false,
    });
  }
}

export default new SearchController();
