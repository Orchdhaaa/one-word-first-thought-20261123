import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One word, first thought: the scent of rain on dry earth.
const WORD = "petrichor";

// The gate only accepts UTF-8 text of 1 to 24 characters that is not
// whitespace-only, and the entry must be exactly one word, so verify the
// word meets the gate and holds no whitespace before writing it.
const codePoints = [...WORD].length;
if (codePoints < 1 || codePoints > 24 || WORD.trim().length === 0) {
  throw new Error(`entry word is ${codePoints} code points, outside the 1-24 gate`);
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be exactly one word with no whitespace");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}/entry.txt`;
writeFileSync(outFile, WORD, "utf8");
const back = readFileSync(outFile, "utf8");
if (back !== WORD) {
  throw new Error("read-back mismatch: written file differs from the word");
}
console.log(`wrote ${codePoints} code points to ${outFile}`);
