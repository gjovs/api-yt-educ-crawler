import {
  app
} from '../configs';

const {
  valideQueries
} = app;

export default (querie) => valideQueries[0].ranking.includes(querie.toLowerCase())
