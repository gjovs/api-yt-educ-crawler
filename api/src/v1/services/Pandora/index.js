import {
  youtubeEducFetch
} from './helper'

import {
  urls
} from './helper'

import axios from 'axios';

import getInitYtData from '../helpers/getInitYtData'

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
    this.initData;
  }


  async getContent() {
    const html = await youtubeEducFetch(this.searchTerm)

    const initYtData = getInitYtData(html);

    this.initData = initYtData;

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

  async details(searchTerm) {
    const playlists = await this.getPlaylists(searchTerm)

    const response = await Promise.all(playlists.map(async (url) => {
      const { data } = await axios(url)
      const initData = getInitYtData(data)
      const videos = initData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents.map(({ playlistVideoRenderer }) => {
        if (playlistVideoRenderer) return playlistVideoRenderer.videoId
      }).slice(0, -1)
      return { url, videos }
    }))

    return response;
  }


}

export default new Pandora();
