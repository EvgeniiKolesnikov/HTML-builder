import { createReadStream } from 'fs';
import { stdout as output } from 'process';

export const read = async (targetFilename) => {
  const url = new URL(targetFilename, import.meta.url);
  const rs = createReadStream(url, 'utf-8');

  rs.pipe(output);
  rs.once('error', (err) => {
    err.code === 'ENOENT'
      ? console.log('Нету такого файла, сорян :)')
      : console.log('Какая-то ошибка... лол :/', err);
  });
};

read('text.txt');



/* ▓▒░ Обратите внимание! ATTENTION! Look here! (｡◕‿◕｡) ░▒▓ 

Тут используются es6 modules(import/export).
Добавьте строку "type": "module", в package.json !

Можете скопировать скрипты из package.json (¬‿¬ )
Это как "е...й лес around, where am I?", только круче :D

--- Запускать задачи в терминале нужно так:

npm run 1
npm run 2
npm run 3
npm run 4 
npm run 5
npm run 6

--- Или версия запуска по ТЗ...

node 01-read-file
node 02-write-file
node 03-files-in-folder
node 04-copy-directory
node 05-merge-styles
node 06-build-pag

*/


// Первое правило RSS клуба: не упоминать о RSS клубе. (ᵔ◡ᵔ)  
// Цитата из фильма «Бойцовский клуб» (1999)