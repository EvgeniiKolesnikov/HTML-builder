// === the SECOND SOLUTION with 'path' =====================

import { copyFile, mkdir, readdir, rm, stat } from 'fs/promises';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const scriptDirname = dirname(fileURLToPath(import.meta.url));
const callDirname = process.argv?.[1];

export const copyDir = async (fromDirname, toDirname, isDeepCopy, __dirname) => {
  const fromDir = join(__dirname, fromDirname);
  const toDir = join(__dirname, toDirname);

  await rm(toDir, { force: true, recursive: true });
  await mkdir(toDir, { recursive: true });

  for (const file of await readdir(fromDir, 'utf-8')) {
    const fromFile = join(fromDir, file);
    const toFile = join(toDir, file);
    const stats = await stat(fromFile);

    if (stats.isFile()) await copyFile(fromFile, toFile);
    
    if (stats.isDirectory() && isDeepCopy) {
      const fromDeepDir = join(fromDirname, basename(fromFile));
      const toDeepDir = join(toDirname, basename(toFile));
      await copyDir(fromDeepDir, toDeepDir, isDeepCopy, __dirname);
    }
  }
};

// выпонить код ТОЛЬКО при запуске через node! и нет при импорте! 
if (callDirname === scriptDirname) {
  await copyDir('files', 'files-copy', false, scriptDirname);
}


/**********************************************************/
/*       ▓▒░ Дальшейший код можно НЕ копировать ░▒▓       */
/*              Это были мои первые решения               */
/*            Эксперименты (ᵔ◡ᵔ) так сказать             */
/*         YAGNI как-нибудь потом. axaxa ┐(ᵔーᵔ )┌        */
/**********************************************************/


// === the FIRST SOLUTION with 'URL' =======================

// import { copyFile, mkdir, readdir, rm } from 'fs/promises';

// export const copyDir = async (fromDirName, toDirName) => {
//   const inputDir = new URL(fromDirName, import.meta.url);
//   const outputDir = new URL(toDirName, import.meta.url);

//   await rm(outputDir, { force: true, recursive: true });
//   await mkdir(outputDir, { recursive: true });

//   for (const file of await readdir(inputDir, 'utf-8')) { 
//     const inputFile = new URL(`${fromDirName}/${file}`, import.meta.url);
//     const outputFile = new URL(`${outputDir}/${file}`, import.meta.url);
//     // console.log(fileURLToPath(outputFile));
//     await copyFile(inputFile, outputFile);
//   }
// };

// copyDir('files', 'files-copy');