import axios from "axios";


export default async (url) => {
  const {
    data
  } = await axios.get(url);
  return data;
}
