
import { readFile, writeFile } from 'fs/promises';
import { inspect } from 'util';

(async () => {
  const json = await readFile('./assets/goods-original.json', 'utf-8');
  const jsonObject = JSON.parse(json);
  const processed = JSON.stringify(jsonObject);
  await writeFile('./assets/goods.json', processed);
})();
