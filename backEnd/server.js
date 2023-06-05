const bodyParser = require('body-parser')
const config = require('./config');
const { MongoClient, ServerApiVersion } = require('mongodb');

const express = require('express')
const app = express()

const client = new MongoClient(config.db_connection, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await trySetupProject();
  } finally {
  }
}
run().catch(console.dir);

handleCors = (app) => {
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin",
      "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });
}

startApp = (app) => {
  const { host, port } = config;
  app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}


async function trySetupProject() {
  await client.connect();
  const db = client.db("Laba4");

  handleCors(app);
  handleJsonOptions();

  require('./routes/index')(app, db);

  startApp(app);
}


function handleJsonOptions() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname));
}

