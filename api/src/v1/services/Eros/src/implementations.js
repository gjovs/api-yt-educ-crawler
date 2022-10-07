import contentFetch from "./helpers/contentFetch";
import fs from 'fs'
import path from 'path'
class Eros {
  rankingByRelevance(contents = []) {
    // scraper the videos and playlists links


  }
  async rankingByViews(contents = []) {
    // scraper the videos and playlists links

    const contentsHTML = await Promise.all(contents.map(async (content) => await contentFetch(content)))

    fs.writeFileSync(path.resolve(__dirname, 'teste.html'), contentsHTML[0], (err) => {
      console.log(`fodase`)
    })

    return false
  }
}


export default new Eros();
