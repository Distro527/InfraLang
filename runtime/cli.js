#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { runInfraFile } from "./index.js";

const program = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const version = "0.2.0";

// 🟦 Fancy banner
const banner = chalk.cyanBright(`
╭───────────────────────────╮
│      InfraHub v${version}       │
╰───────────────────────────╯
`);

// Print banner on every command
console.log(banner);

// Command: infra run <file>
program
  .command("run <file>")
  .alias("r")
  .description("Run an InfraLang file")
  .action(async (file) => {
    try {
      const filePath = path.resolve(process.cwd(), file);

      if (!fs.existsSync(filePath)) {
        console.log(chalk.red(`❌ File not found: ${file}`));
        console.log(chalk.yellow(`💡 Try 'infra new ${file.replace(".infra", "")}' to create one.`));
        return;
      }

      console.log(chalk.cyan(`🚀 Running ${file}...\n`));
      await runInfraFile(filePath);
      console.log(chalk.green(`\n✅ Execution complete!`));
    } catch (err) {
      console.error(chalk.red(`\n❗ Error: ${err.message}`));
    }
  });

// Command: infra new <name>
program
  .command("new <name>")
  .alias("n")
  .description("Create a new InfraLang file")
  .action(async (name) => {
    const filename = name.endsWith(".infra") ? name : `${name}.infra`;
    const filepath = path.resolve(process.cwd(), filename);

    if (fs.existsSync(filepath)) {
      console.log(chalk.yellow(`⚠️ File already exists: ${filename}`));
      return;
    }

    const sampleCode = `print "Hello from ${name}!"\nlet x = 5\nprint "Value of x: " + x`;
    await fs.writeFile(filepath, sampleCode);
    console.log(chalk.green(`✅ Created new file: ${filename}`));
  });

// Command: infra info
program
  .command("info")
  .description("Show InfraHub environment information")
  .action(() => {
    console.log(chalk.cyan("📦 InfraHub Environment Info:\n"));
    console.log(`Version: ${version}`);
    console.log(`Node.js: ${process.version}`);
    console.log(`Install path: ${__dirname}`);
    console.log(`Working dir: ${process.cwd()}`);
  });

// Built-in options
program
  .version(version, "-v, --version", "Show InfraHub version")
  .helpOption("-h, --help", "Show available commands");

program.parse(process.argv);

// If no command given
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
