#!/usr/bin/env node
/**
 * runtime/cli.js
 * InfraHub CLI entrypoint (merged full version)
 *
 * Commands:
 *   infra run <file>    Run an .infra file
 *   infra new <name>    Create a template .infra file
 *   infra info          Show environment info
 *   infra --version     Show CLI version
 *   infra --help        Show help
 */

import { Command } from "commander";
import chalk from "chalk";
import path from "path";
import fs from "fs";
import { runInfraFile, version as infraVersion } from "./index.js";

const program = new Command();

// small banner (shown once)
const banner = `
╭──────────────────────────────╮
│         InfraHub CLI         │
│       v${infraVersion} (beta)      │
╰──────────────────────────────╯
`;

// resolve file path from CWD so CLI can be global
function resolveFile(file) {
  return path.resolve(process.cwd(), file);
}

function printBanner() {
  // print compact banner
  console.log(chalk.cyanBright(banner));
}

// configure program
program
  .name("infra")
  .description("InfraHub — runtime for InfraLang")
  .version(infraVersion, "-v, --version", "Show current version");

// run command
program
  .command("run <file>")
  .alias("r")
  .description("Run an .infra file")
  .option("--beta", "Enable experimental beta features")
  .action(async (file, options) => {
    try {
      printBanner();

      const filepath = resolveFile(file);

      if (!fs.existsSync(filepath)) {
        console.error(chalk.red(`❌ File not found: ${file}`));
        console.log(chalk.dim(`Tip: run 'infra new ${path.basename(file, ".infra")}' to create a template.`));
        process.exitCode = 2;
        return;
      }

      await runInfraFile(filepath, options);
    } catch (err) {
      console.error(chalk.red("❌ Unhandled error:"));
      console.error(chalk.gray(err.stack || err.message));
      process.exitCode = 1;
    }
  });

// new command: create template
program
  .command("new <name>")
  .alias("n")
  .description("Create a new .infra template file")
  .action(async (name) => {
    try {
      const filename = name.endsWith(".infra") ? name : `${name}.infra`;
      const filepath = resolveFile(filename);
      if (fs.existsSync(filepath)) {
        console.log(chalk.yellow(`⚠ File already exists: ${filename}`));
        return;
      }

      const template = [
        'print "Hello Infra!"',
        "let x = 5",
        'print "Value of x: " + x',
        "",
        "# Add more InfraLang commands here",
      ].join("\n");

      await fs.promises.writeFile(filepath, template, "utf8");
      console.log(chalk.green(`✅ Created ${filename}`));
    } catch (err) {
      console.error(chalk.red("Failed to create template:"), err.message);
      process.exitCode = 1;
    }
  });

// info command
program
  .command("info")
  .description("Show environment and install info")
  .action(() => {
    printBanner();
    console.log(chalk.cyan("Environment:"));
    console.log(`  Version: ${infraVersion}`);
    console.log(`  Node: ${process.version}`);
    console.log(`  Platform: ${process.platform}`);
    console.log(`  CWD: ${process.cwd()}`);
  });

// override help text extras
program.addHelpText(
  "after",
  `\nExamples:\n  infra run hello.infra\n  infra new demo\n  infra run demo.infra --beta\n`
);

// default behavior when no args: show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  program.parse(process.argv);
}
