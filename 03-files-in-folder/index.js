// === the THIRD SOLUTION w 'URL' wo 'withFileTypes' ========

import { readdir, stat } from 'fs/promises';
import { extname, basename } from 'path';
import { fileURLToPath } from 'url';

export const readDir = async (targetDirname) => {
  const targetDir = new URL(targetDirname, import.meta.url);

  for (let filename of await readdir(targetDir, 'utf-8')) {
    const fileUrl = new URL(`${targetDirname}/${filename}`, import.meta.url);
    const file = fileURLToPath(fileUrl);
    const ext = extname(file).slice(1);
    const name = basename(file, extname(file));

    const stats = await stat(file);
    if (stats.isFile()) {
      const size = stats.size;
      console.log(`${name} - ${ext} - ${size}b`);
    }
  }
};

readDir('secret-folder');



/**********************************************************/
/*       ▓▒░ Дальшейший код можно НЕ копировать ░▒▓       */
/*              Это были мои первые решения               */
/*            Эксперименты (ᵔ◡ᵔ) так сказать             */
/*         YAGNI как-нибудь потом. axaxa ┐(ᵔーᵔ )┌        */
/**********************************************************/


// === the FIRST SOLUTION w 'path' w 'withFileTypes' & kb ====
// import { stat } from 'fs';
// import { readdir } from 'fs/promises';
// import { dirname, join, extname, basename } from 'path';
// import { fileURLToPath } from 'url';

// export const readDir = async (targetDirname) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);
//   const targetPath = join(__dirname, targetDirname);

//   const files = await readdir(targetPath, {
//     encoding: 'utf-8',
//     withFileTypes: true,
//   });

//   for (const file of files) {
//     if (file.isFile()) {
//       const filePath = join(targetPath, file.name);
//       let ext = extname(filePath);
//       const name = basename(file.name, ext);
//       ext = ext.slice(1);
//       stat(filePath, (err, stats) => {
//         let size = stats.size / 1024;
//         console.log(`${name} - ${ext} - ${size}kb`);
//       });
//     }
//   }
// };

// readDir('secret-folder');



// === the SECOND SOLUTION w 'path' wo 'withFileTypes' ======

// import { stat } from 'fs';
// import { readdir } from 'fs/promises';
// import { dirname, join, extname, basename } from 'path';
// import { fileURLToPath } from 'url';

// export const readDir = async (targetDirname) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = dirname(__filename);
//   const targetPath = join(__dirname, targetDirname);

//   for (const file of await readdir(targetPath, 'utf-8')) {
//     const filePath = join(targetPath, file);
//     const ext = extname(filePath).slice(1);
//     const name = basename(file, extname(filePath));

//     stat(filePath, (err, stats) => {
//       if (stats.isFile()) {
//         const size = stats.size;
//         console.log(`${name} - ${ext} - ${size}b`);
//       }
//     });
//   }
// };

// readDir('secret-folder');