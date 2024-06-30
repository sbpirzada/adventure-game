#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Player {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
  fuelIncrease() {
    this.fuel = 100;
  }
}

class Opponent {
  name: string;
  fuel: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  fuelDecrease() {
    this.fuel -= 25;
  }
}

async function main() {
  let player = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: chalk.bgGreenBright("\nPlease Enter Your Name:"),
    },
  ]);
  let opponent = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: chalk.bgGreenBright("\nPlease Select Your Opponent:"),
      choices: ["Skeleton", "Alien", "Zombie"],
    },
  ]);

  let p1 = new Player(player.name);
  let o1 = new Opponent(opponent.select);

  do {
    // Skeleton
    let ask = await inquirer.prompt([
      {
        name: "opt",
        type: "list",
        message: chalk.bgGreenBright("\nWhat would you like to do?"),
        choices: ["Attack", "Drink Potion", "Run for Your Life..."],
      },
    ]);

    if (ask.opt == "Attack") {
      let num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(chalk.blackBright(`\n${p1.name} fuel is ${p1.fuel}`));
        console.log(chalk.blackBright(`${o1.name} fuel is ${o1.fuel}`));

        if (p1.fuel <= 0) {
          console.log(
            chalk.bgGreenBright("\nYou Loose, Better Luck Next Time.")
          );
          process.exit();
        }
      } else {
        o1.fuelDecrease();
        console.log(chalk.blueBright(`\n${p1.name} fuel is ${p1.fuel}`));
        console.log(chalk.blueBright(`${o1.name} fuel is ${o1.fuel}`));

        if (o1.fuel <= 0) {
          console.log(chalk.bgGreenBright("\nCongratulations! You Win."));
          process.exit();
        }
      }
    } else if (ask.opt == "Drink Potion") {
      p1.fuelIncrease();
      console.log(
        chalk.bgGreenBright(
          `\nYou Drink Health Portion, Your fuel is ${p1.fuel}`
        )
      );
    } else if (ask.opt == "Run for Your Life...") {
      console.log(chalk.bgGreenBright("\nYou Loose, Better Luck Next Time."));
      process.exit();
    }
  } while (true);
}

main();
