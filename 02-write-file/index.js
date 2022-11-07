import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

export const write = async (targetFilename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const targetPath = join(__dirname, targetFilename);

  const textIn = '*** Приглашаю на ввод :D Пиши что хочешь! (╯°-°)╯ ┻━━┻ ***' + '\n';
  const textOut = '\n' + '*** Очень интересно. Пока :) Удачи, любви (╮°-°)╮ ┳━━┳ ***';

  const rl = createInterface({ input, output })
  const ws = createWriteStream(targetPath, 'utf-8');

  console.log(textIn);

  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log(textOut);
      rl.close();
    } else {
      ws.write(input + '\n');
    }
  });

  rl.on('SIGINT', () => {
    console.log(textOut);
    rl.close();
  });
};

write('text.txt');