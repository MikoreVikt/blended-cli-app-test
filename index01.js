const readline = require("readline");
const fs = require("fs").promises;
const { program } = require("commander");
require("colors");

program.option(
  "-f, --file [type]",
  "file for logging game results",
  "logs.txt"
);
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.on("line", (txt) => {
//   console.log(`You write this text: "${txt}"`);
//   process.exit();
// });

let counter = 0;
const mind = Math.ceil(Math.random() * 10);
const logFile = program.opts().file;

const isValid = (v) => {
  if (isNaN(v)) {
    console.log("Введите число!".red);
    return false;
  }

  if (!Number.isInteger(v)) {
    console.log("Введите целое число!".red);
    return false;
  }

  if (v < 1 || v > 10) {
    console.log("Число должно быть в диапазоне 1 до 10".red);
    return false;
  }

  if (v !== mind) {
    console.log("Вы не угадали, еще попытка!".red);
    return false;
  }

  return true;
};

const logger = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Удалось сохранить результат в файл ${logFile}`.green);
  } catch (err) {
    console.log(`Не удалось сохранить файл ${logFile}`.red);
  }
};

const game = () => {
  rl.question("Введите число от 1 до 10! Ваше число: ".yellow, (v) => {
    const number = +v;
    counter += 1;

    if (!isValid(number)) {
      return game();
    }

    console.log(`Вы угадали за ${counter} шаг(a/ов) =^^= !`.green);

    logger(
      `${new Date().toLocaleDateString(
        "uk-UA"
      )}: Поздравляю! Вы угадали за ${counter} шаг(a/ов) =^^= !`.green
    );

    rl.close();
  });
};

game();
