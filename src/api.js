import app from "../api/src/v1/app";

import serverless from 'serverless-http';

const handler = serverless(app)

export { handler }
