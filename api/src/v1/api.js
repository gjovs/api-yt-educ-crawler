import app from "./app";

import serverless from 'serverless-http';

const handler = serverless(app)

export { handler }
