#!/usr/bin/env node

import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_DIR = path.resolve(__dirname, "../template");

function printUsage() {
  console.log("Usage: create-github-whatsapp-notifier <project-name>");
}

function copyTemplate(src, dest, projectName) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const outputName = entry.name === "gitignore" ? ".gitignore" : entry.name;
    const destPath = path.join(dest, outputName);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplate(srcPath, destPath, projectName);
      continue;
    }

    let content = fs.readFileSync(srcPath, "utf8");
    content = content.replaceAll("__PROJECT_NAME__", projectName);
    fs.writeFileSync(destPath, content, "utf8");
  }
}

const targetInput = process.argv[2];

if (!targetInput) {
  printUsage();
  process.exit(1);
}

const targetDir = path.resolve(process.cwd(), targetInput);
const projectName = path.basename(targetDir);

if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  console.error(`Error: target directory is not empty: ${targetDir}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
copyTemplate(TEMPLATE_DIR, targetDir, projectName);

console.log(`\nCreated ${projectName} at ${targetDir}`);
console.log("\nNext steps:");
console.log(`  cd ${targetInput}`);
console.log("  cp .env.example .env");
console.log("  npm install");
console.log("  npm start\n");
