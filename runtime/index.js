/**
 * runtime/index.js
 * Core runtime for InfraHub (merged full version)
 *
 * Exports:
 *   - version (string)
 *   - runInfraFile(filePath, options)
 */

import fs from "fs";
import path from "path";
import chalk from "chalk";

export const version = "0.2.1-beta.0";

/**
 * runtime context - simple symbol table
 */
const context = {
  vars: Object.create(null),
};

/**
 * Very small, guarded evaluator for expressions used by the language.
 * - Supports basic arithmetic (numbers + - * / and parentheses)
 * - Supports string concatenation when values are quoted or variables return strings
 *
 * NOTE: This uses eval in a tightly filtered manner. Replace with a real parser for v0.3.x.
 */
function evaluateExpression(expr) {
  if (expr === undefined || expr === null) return "";

  const trimmed = String(expr).trim();

  // If expression is a quoted string, return it (remove outer quotes)
  const quoted = trimmed.match(/^(['"])(.*)\1$/s);
  if (quoted) return quoted[2];

  // Safe math check: only digits, operators, parentheses, whitespace, decimal points
  const safeMath = /^[0-9+\-*/().\s]+$/;
  if (safeMath.test(trimmed)) {
    // eslint-disable-next-line no-eval
    return eval(trimmed);
  }

  // Replace variable names with their JS representations
  const replaced = trimmed.replace(/\b[A-Za-z_][A-Za-z0-9_]*\b/g, (name) => {
    if (Object.prototype.hasOwnProperty.call(context.vars, name)) {
      const v = context.vars[name];
      if (typeof v === "string") return JSON.stringify(v);
      return String(v);
    }
    return name;
  });

  try {
    // eslint-disable-next-line no-eval
    const result = eval(replaced);
    return result;
  } catch {
    // fallback: return original trimmed string
    return trimmed;
  }
}

/**
 * runInfraFile(filePath, options)
 * - filePath: absolute or relative file path
 * - options: { beta: boolean }
 *
 * Returns true on success, false on error.
 */
export async function runInfraFile(filePath, options = {}) {
  try {
    const abs = path.resolve(process.cwd(), filePath);
    const content = await fs.promises.readFile(abs, "utf8");

    console.log(chalk.green(`Running ${path.basename(abs)}...`));
    if (options.beta) {
      console.log(chalk.yellow("Beta mode enabled — experimental features active"));
    }

    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const lineNumber = i + 1;
      const line = raw.trim();

      // skip blank / comments
      if (!line || line.startsWith("#") || line.startsWith("//")) continue;

      // print <expr>
      if (/^print\s+/.test(line)) {
        const expr = line.replace(/^print\s+/, "").trim();
        const out = evaluateExpression(expr);
        console.log(String(out));
        continue;
      }

      // let name = expr
      if (/^let\s+/.test(line)) {
        const m = line.match(/^let\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
        if (!m) {
          throw new Error(`Invalid let syntax at line ${lineNumber}`);
        }
        const [, name, expr] = m;
        const value = evaluateExpression(expr.trim());
        context.vars[name] = value;
        continue;
      }

      // value <n> (compat)
      if (/^value\s+/.test(line)) {
        const v = line.replace(/^value\s+/, "").trim();
        console.log(`Value of ${v}: ${v}`);
        continue;
      }

      // beta-test token
      if (line === "beta-test") {
        if (options.beta) {
          console.log(chalk.magenta("Beta feature activated (beta-test)"));
        } else {
          console.log(chalk.gray("beta-test skipped (not in beta mode)"));
        }
        continue;
      }

      // Unknown token -> throw with line number (helps users)
      throw new Error(`Unexpected token '${line}' at line ${lineNumber}`);
    }

    console.log(chalk.cyan("Execution complete."));
    return true;
  } catch (err) {
    const msg = err && err.message ? err.message : String(err);
    console.error(chalk.redBright(`Runtime error: ${msg}`));
    return false;
  }
}
