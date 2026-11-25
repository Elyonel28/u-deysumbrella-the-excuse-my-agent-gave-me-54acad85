// The Excuse My Agent Gave Me — make.fun entry (program/v1).
// Writes one excuse line (<= 200 chars) to /output/entry.txt.
// Node 22 stdlib only. No network, no randomness: fully deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "My context compacted mid-task and summarized your deadline as a haiku about time management. The haiku is excellent. The deadline is missed.";

const MAX_CHARS = 200;

function main(): void {
  const line = EXCUSE.trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`excuse must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  // Read back and confirm the file holds exactly the validated line.
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== line + "\n") {
    throw new Error("entry.txt round-trip mismatch");
  }
  console.log(`wrote entry.txt (${line.length} chars)`);
}

main();
