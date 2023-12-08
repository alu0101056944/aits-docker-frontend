
'use strict';

import express from 'express';
import {fileURLToPath} from 'url';
import cors from 'cors';
import nocache from 'nocache';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://10.6.128.129:27017/maindatabase';

// cli:
// mongoimport --db maindatabase  --collection foo  --file assets/goods.json

async function fetchData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db('maindatabase');
    const collection = database.collection('foo');

    // Fetch the data
    const result = await collection.find().toArray();

    // Print the results
    console.log(result);
    delete result[0]._id;
    return result[0];
  } finally {
    // Close the connection when done
    await client.close();
    console.log('Connection closed');
  }
}

// Create and serve http server
function main() {
  const app = express();
  const PORT = 8080;
  app.set('port', PORT);
  app.use(cors());
  app.use(nocache());

  app.listen(PORT, '0.0.0.0', () => {
        console.log('Server listening at 0.0.0.0:' + PORT);
      });

  app.get('/', async (request, response) => {
        try {
          // response.send(JSON.stringify(RESPONSE_CONTENT, null, 2));
          const responseJson = await fetchData();
          console.log('able to fetch from db');
          response.send(responseJson);
        } catch (error) {
          console.error('Could not fetch information from mongo database: ' + error);
          console.error('Did not start express web server.');
          response.status(500).send('Internal Server Error');
        }
      });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
