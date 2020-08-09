import jsURL from 'jsurl';
import { compress, decompress } from './stringcompressor';

export function serialize(conferences, divisions, league, relocations, expansions) {
  const data = [];

  data.push(conferences, divisions);

  data.push(compress(league));

  data.push(relocations.map(t => [t.id, t.cityid]));
  data.push(expansions.map(t => [t.name, t.cityid]));

  return jsURL.stringify(data);
}

export function deserialize(string) {
  const data = jsURL.parse(string);
  if (!data) return {};

  const response = {};

  [response.conferences, response.divisions] = data;
  response.league = decompress(data[2], response.divisions);

  response.relocations = data[3].map(d => ({ id: d[0], city: d[1] }));
  response.expansions = data[4].map(d => ({ name: d[0], city: d[1] }));

  return response;
}
