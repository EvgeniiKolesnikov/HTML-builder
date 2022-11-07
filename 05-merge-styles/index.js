// === the SECOND SOLUTION with 'path' =====================

import { createReadStream, createWriteStream } from 'fs';
import { readdir, stat } from 'fs/promises';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const scriptDirname = dirname(fileURLToPath(import.meta.url));
const callDirname = process.argv?.[1];

export const mergeStyle = async (fromDirname, toDirname, toFilename, __dirname) => {
  const fromDir = join(__dirname, fromDirname);
  const toFile = join(__dirname, toDirname, toFilename);

  const ws = createWriteStream(toFile, 'utf-8');

  for (const file of await readdir(fromDir, 'utf-8')) {
    const fromFile = join(fromDir, file);
    const ext = extname(fromFile);
    const stats = await stat(fromFile);

    if (stats.isFile() && ext === '.css') {
      const rs = createReadStream(fromFile, 'utf-8');
      rs.once('data', (data) => ws.write(data));
    }
  }
};

// выпонить код ТОЛЬКО при запуске через node! и нет при импорте! 
if (callDirname === scriptDirname) {
  await mergeStyle('styles', 'project-dist', 'bundle.css', scriptDirname);
}


// В style-3.css добавьте нормальные (О_о ) отступы для Плутона 

// .pluto {
//  ...
// 	margin-top: -390px;
// 	margin-left: -390px;
//  ...
// }


/**********************************************************/
/*       ▓▒░ Дальшейший код можно НЕ копировать ░▒▓       */
/*              Это были мои первые решения               */
/*            Эксперименты (ᵔ◡ᵔ) так сказать             */
/*         YAGNI как-нибудь потом. axaxa ┐(ᵔーᵔ )┌        */
/**********************************************************/


// ============ the FIRST SOLUTION with 'URL' ==============

// import { createReadStream, createWriteStream } from 'fs';
// import { readdir, stat } from 'fs/promises';
// import { extname } from 'path';
// import { fileURLToPath } from 'url';

// export const mergeStyle = async (fromDirname, toDirname, toFileName) => {
//   const fromDirUrl = new URL(fromDirname, import.meta.url);
//   const toFileUrl = new URL(`${toDirname}/${toFileName}`, import.meta.url);

//   const ws = createWriteStream(toFileUrl, 'utf-8');

//   for (const file of await readdir(fromDirUrl, 'utf-8')) {
//     const fromFileUrl = new URL(`${fromDirname}/${file}`, import.meta.url);
//     const ext = extname(fileURLToPath(fromFileUrl));
//     const stats = await stat(fromFileUrl);

//     if (stats.isFile() && ext === '.css') {
//       const rs = createReadStream(fromFileUrl, 'utf-8');

//       rs.once('data', (data) => ws.write(data));
//     }
//   }
// };

// mergeStyle('styles', 'project-dist', 'bundle.css');