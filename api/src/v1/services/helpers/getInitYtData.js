import { parse } from 'himalaya';

export default (html) =>  {
  const json = parse(html);

  const body = json[1].children[1].children

  const script = body.filter((el) => el.tagName === 'script')[13].children[0].content.substring(19).slice(0, -1)

  return JSON.parse(script)
}
