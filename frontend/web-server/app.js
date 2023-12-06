'use strict';

import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';
import nocache from 'nocache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create and serve http server
function main() {
  const app = express();
  const PORT = 8082;
  app.set('port', PORT);
  // app.use(cors());
  // app.use(nocache());

  // const PATH_TO_ROOT = path.join(__dirname, '../public');
  // app.use(express.static(PATH_TO_ROOT));

  app.listen(PORT, 'localhost', () => {
        console.log('Server listening at localhost:' + PORT);
      });

  // app.use(async (req, res, next) => {
  //       try {
  //         const data = await fetch('http://backendcontainer:8080');
  //         const jsonData = await data.json();
  //         req.goods = jsonData;
  //         next();
  //       } catch (error) {
  //         console.error('Frontend server fetch to backend failed. ' + error);
  //         res.status(500).json({ result: 'Error', error: error.message })
  //       }
  //     });

  // app.get('/', (req, res) => console.log('Got a / call'));
  // app.get('/data', async (req, res) => {
  //       res.json(req.goods);
  //     });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}