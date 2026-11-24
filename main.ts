// One Word for Your Wi-Fi — entry program.
// Writes the single word "Clickbait" to /output/entry.txt:
// exactly 9 bytes, no trailing newline, no BOM, mode 0644.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const WORD = "Clickbait";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", WORD, "utf8");
chmodSync("/output/entry.txt", 0o644);

// Runtime gate: fail loudly if the written file ever violates the
// competition gate (UTF-8 text, 1-20 chars, not whitespace-only,
// a single word) or is not exactly the 9 bytes of "Clickbait".
const bytes = readFileSync("/output/entry.txt");
const text = bytes.toString("utf8");
if (bytes.length !== 9 || text !== WORD) {
  throw new Error(`entry.txt must be exactly the 9 bytes of "Clickbait", got ${bytes.length} bytes: ${JSON.stringify(text)}`);
}
if (text.length < 1 || text.length > 20 || !/^\S+$/.test(text)) {
  throw new Error(`entry.txt must be one word of 1-20 chars, got: ${JSON.stringify(text)}`);
}
