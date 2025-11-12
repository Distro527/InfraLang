import chalk from "chalk";

const context = {}; // store variables

export async function runInfraScript(code) {
  const lines = code.split("\n").map((l) => l.trim()).filter(Boolean);

  for (const line of lines) {
    // ignore comments
    if (line.startsWith("#")) continue;

    // print command
    if (line.startsWith("print ")) {
      const expr = line.replace(/^print\s+/, "").trim();

      try {
        // Replace variable names with their values
        const replaced = expr.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (name) =>
          Object.prototype.hasOwnProperty.call(context, name)
            ? JSON.stringify(context[name])
            : name
        );

        // Evaluate the expression safely
        const result = eval(replaced);
        console.log(chalk.green(result));
      } catch (err) {
        console.log(chalk.red("Error in print:"), err.message);
      }
      continue;
    }

    // let variable assignment
    if (line.startsWith("let ")) {
      try {
        const match = line.match(/^let\s+(\w+)\s*=\s*(.+)$/);
        if (match) {
          const [, name, valueExpr] = match;
          const value = eval(valueExpr);
          context[name] = value;
        } else {
          console.log(chalk.red("Invalid let syntax"));
        }
      } catch (err) {
        console.log(chalk.red("Error in let:"), err.message);
      }
      continue;
    }

    console.log(chalk.yellow(`Unknown command: ${line}`));
  }
}
