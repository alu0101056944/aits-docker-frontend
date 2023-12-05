'use strict';

import express from 'express';
import {fileURLToPath} from 'url';
import cors from 'cors';
import nocache from 'nocache';

// Create and serve http server
function main() {
  const app = express();
  const PORT = 8080;
  app.set('port', PORT);
  app.use(cors());
  app.use(nocache());

  app.listen(PORT, 'localhost', () => {
        console.log('Server listening at 0.0.0.0:' + PORT);
      });

  app.use(async (req, res, next) => {
        try {
          const data = await fetch('http://backendcontainer:8080');
          const jsonData = await data.json();
          req.goods = jsonData;
          next();
        } catch (error) {
          console.error('Frontend server fetch to backend failed. ' + error);
          res.status(500).json({ result: 'Error', error: error.message })
        }
      });

  app.get('/data', async (req, res) => {
        try {
          // response.send(JSON.stringify(RESPONSE_CONTENT, null, 2));
          const responseJson = await fetchData();
          console.log('able to fetch from db');
          res.json(response);
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