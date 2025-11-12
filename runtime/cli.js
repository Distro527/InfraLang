#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { runInfraScript } from "./index.js";

const program = new Command();

program
  .name("infra")
  .description("InfraLang — the hybrid infrastructure scripting language")
  .version("0.1.0");

program
  .command("run <file>")
  .description("Run an .infra file")
  .action(async (file) => {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`File not found: ${file}`));
      process.exit(1);
    }

    const code = fs.readFileSync(filePath, "utf8");
    await runInfraScript(code);
  });

program.parse(process.argv);
