// Entry for make.fun bounty "The GPS Swears It Was a Shortcut"
// (u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9).
// Writes the GPS's own excuse for sending the driver down the wrong
// road to /output/entry.txt. Gate: 1-200 UTF-8 characters.
// The program re-reads the file after writing it and fails loudly if
// the content on disk differs from the line by even one byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  `I said "recalculating" to sound confident, but I've actually been guessing since the roundabout.`;

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

// Count characters (code points), not bytes: an entry with multi-byte
// characters still counts one per visible character for the gate.
function checkGate(line: string): number {
  const charCount = [...line].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(
      `Entry is ${charCount} characters; gate requires ${MIN_CHARS}-${MAX_CHARS}.`,
    );
  }
  return charCount;
}

function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
}

function verifyEntry(line: string): void {
  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  if (onDisk !== line) {
    throw new Error("Output file does not match the entry line exactly.");
  }
}

const charCount = checkGate(LINE);
writeEntry(LINE);
verifyEntry(LINE);
console.log(`Wrote ${OUTPUT_PATH} (${charCount} characters).`);
