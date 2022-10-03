import axios from 'axios'
import urls from '../urls';

const {
  youtubeBaseUrl
} = urls;

const addSearchQuery = (searchTerm) => {
  const query = new URLSearchParams({
    query: searchTerm
  });
  return `${youtubeBaseUrl}search?${query}`
}

const config = {
	headers: {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
	},
};

export default async (searchTerm) => {
  const url = addSearchQuery(searchTerm)
  const response = await axios.get(url, config)
    return response.data
}
