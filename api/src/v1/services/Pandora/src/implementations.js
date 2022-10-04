import {
  youtubeEducFetch
} from './helper'

import {
  urls
} from './helper'

const {
  ytPlaylistBaseUrl,
  ytVideoBaseUrl
} = urls

import {
  parse
} from 'himalaya'

class Pandora {

  constructor() {
    this.searchTerm;
    this.content;
  }


  async getContent() {
    const html = await youtubeEducFetch(this.searchTerm)

    const json = parse(html)

    const body = json[1].children[1].children

    const script = body.filter((el) => el.tagName === 'script')[13].children[0].content.substring(19).slice(0, -1)

    const initYtData = JSON.parse(script)

    const {
      contents
    } = initYtData;

    if (!contents) {
      return false
    }

    const tabs = initYtData.contents.twoColumnBrowseResultsRenderer.tabs

    const expandableTabRenderer = tabs.filter(({
      expandableTabRenderer
    }) => {
      if (expandableTabRenderer) return expandableTabRenderer
    })[0].expandableTabRenderer.content.sectionListRenderer.contents

    
    let contentRenderer = [];

    expandableTabRenderer.forEach((content) => {
      const { itemSectionRenderer } = content

      if (!itemSectionRenderer) return;

      const { contents } = itemSectionRenderer;

      contentRenderer.push(contents[0])
    })

    this.content = contentRenderer
  }

  async getPlaylists(searchTerm) {


    this.searchTerm = searchTerm;
    await this.getContent()

    if (!this.content) {
      return false
    }


    const playlists = this.content.map((e) => {
      if (e.playlistRenderer) {
        return ytPlaylistBaseUrl + e.playlistRenderer.playlistId
      }
    }).filter((link) => link != undefined)


    return playlists
  }


  async getVideos(searchTerm) {


    this.searchTerm = searchTerm;
    await this.getContent()

    if (!this.content) {
      return false
    }


    const videos = this.content.map((e) => {
      if (e.videoRenderer) {
        return ytVideoBaseUrl + e.videoRenderer.videoId
      }
    }).filter((link) => link != undefined)


    return videos
  }


}


export default new Pandora();
