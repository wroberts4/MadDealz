require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 4000;

const server = app.listen(port, () =>
  console.log("Listening on port " + port),
);