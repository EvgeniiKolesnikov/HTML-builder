import { mkdir, readdir, readFile, rm, stat, writeFile } from 'fs/promises';
import { basename, dirname, extname, join } from 'path';
import { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
const { copyDir } = await import('../04-copy-directory/index.js');
const { mergeStyle } = await import('../05-merge-styles/index.js');

// variables (-_-)

// script
const scriptDirname = dirname(fileURLToPath(import.meta.url));

// build
const buildDirname = 'project-dist';
// assets
const fromAssetsDir = 'assets';
const toAssetsDir = `${buildDirname}/${fromAssetsDir}`;
const isDeepCopy = true;
// styles
const stylesDir = 'styles';
const toStyleName = 'style.css';
// html
const toHtmlDir = buildDirname;
const fromHtml = 'template.html';
const toHtml = 'index.html';
const componentsDir = 'components';


const createBuildFolder = async (toDirname, __dirname) => {
  const toDir = join(__dirname, toDirname);
  await rm(toDir, { force: true, recursive: true });
  await mkdir(toDir, { recursive: true });
};

const buildHTML = async (__dirname, toDirname, fromFilename, toFilename, components) => {
  const fromFile = join(__dirname, fromFilename);
  const toFile = join(__dirname, toDirname, toFilename);
  const componentsDir = join(__dirname, components);

  let html = await readFile(fromFile, 'utf8');
  const curlyTags = html.match(/\{\{(.*?)\}\}/g);
  const htmlTags = curlyTags.map(curlyTag => curlyTag.replace(/\{\{|\}\}/g, ''));

  const componentsArr = await readdir(componentsDir, 'utf-8');
  const componentsTags = componentsArr.map(filename => {
    return basename(filename, extname(filename))
  })

  for (let i in htmlTags) {
    const componentsTagIndex = componentsTags.indexOf(htmlTags[i]);
    if (componentsTagIndex !== -1) {
      const file = join(componentsDir, componentsArr[componentsTagIndex]);
      const fileHtml = await readFile(file, 'utf8');
      html = html.replace(new RegExp(curlyTags[i], 'g'), fileHtml);
    } else {
      // типа, удаляем все {{ tag }} из html
      // даже если таких нет в папке components
      console.warn('НЕТУ КОМПОНЕНТА ДЛЯ ТЕГА', curlyTags[i]);
      html = html.replace(new RegExp(curlyTags[i], 'g'), fileHtml);
    }
  }

  await writeFile(toFile, html);
}

const showBuy = async () => {
  const textQuestion = '\n*** Это последний проект из 4 на проверку (y/n)? ***';
  const yText = `
     "Конец дела лучше его начала" ٩(◕‿ ◕｡)۶ 
      Цитата из книги «Библия. Ветхий завет»`;
  const nText = `
"Добравшись до конца, начинаешь думать о начале" ┐(ᵔーᵔ )┌ 
  Цитата из фильма «Мистер и Миссис Смит (2005)»`;
  const winterText =`
   .*.. Зима близко (Winter is coming) (°◡ °) .*.
   ..../\\..«Игра RSS-престолов» (/^-^(^ ^*)/ ♡..*
   .../..\\...*....__██__.....*......*......*.....
   ../....\\.......( • • ).....*...*.........*....
   ./______\\.*....─(░•░)─...*........*...*.......
   ...|..|..*.....(░ • ░)........*......*.....*..
  `;

  const rl = createInterface({ input, output });
  rl.on('line', (input) => {
    if (input === 'y' || input === 'Y'  || input === 'Н'  || input === 'н' ) {
      console.log(yText);
      console.log(winterText);
      rl.close();
    } 
    if (input === 'n' || input === 'N' || input === 'Т' || input === 'т') {
      console.log(nText);
      console.log(winterText);
      rl.close();
    }
    if (input === 'exit') {
      rl.close();
    }
  });

  rl.on('SIGINT', () =>  rl.close());

  console.log(textQuestion);
}

const build = async () => {
  await createBuildFolder(buildDirname, scriptDirname);
  await mergeStyle(stylesDir, buildDirname, toStyleName, scriptDirname);
  await copyDir(fromAssetsDir, toAssetsDir, isDeepCopy, scriptDirname);
  await buildHTML(scriptDirname, toHtmlDir, fromHtml, toHtml, componentsDir);
  await showBuy(); // можете заккоментировать прощальные сообщения :/
};

await build();



/*       ▓▒░ Дальшейший код можно НЕ копировать ░▒▓       */
/*              Это были мои первые решения               */
/*            Эксперименты (ᵔ◡ᵔ) так сказать             */
/*         YAGNI как-нибудь потом. axaxa ┐(ᵔーᵔ )┌        */



// THE FIRST WAY OF REPLACEMENT TAGS ======================

// for (let filename of await readdir(componentsDir, 'utf-8')) {
//   const file = join(componentsDir, filename);
//   filename = basename(filename, extname(filename))
//   // console.log(filename);
//   // console.log(file);

//   const fileHtml = await readFile(file, 'utf8');
//   // console.log(fileHtml);

//   const indexTag = htmlTags.indexOf(filename);
//   // console.log(indexTag);

//   if (indexTag !== -1) {
//     // console.log('curlyTags[indexTag] =', curlyTags[indexTag]);
//     // console.log('fileHtml =', fileHtml);
//     console.log(' ====================================');
//     // console.log(' =', );
//     html = html.replace(curlyTags[indexTag], fileHtml);
//     // console.log(newhtml);
//   }
// }