import contentFetch from "./helpers/contentFetch";

import getInitYtData from "../../helpers/getInitYtData";

class Eros {
  rankingByRelevance(contents = []) {
    // scraper the videos and playlists links

  }
  async rankingByViews(contents = []) {
    // scraper the videos and playlists links

    const contentsHTML = await Promise.all(contents.map(async (content) => await contentFetch(content)))

    const tabs = contentsHTML.map((content) => getInitYtData(content).contents.twoColumnBrowseResultsRenderer.tabs);
    const itemsSection = tabs.map((tab) => tab[0].tabRenderer.content.sectionListRenderer.contents)
    const content = itemsSection.map((item) => item[0].itemSectionRenderer.contents[0].playlistVideoListRenderer)


    console.log(content);

    return false
  }
}


export default new Eros();
