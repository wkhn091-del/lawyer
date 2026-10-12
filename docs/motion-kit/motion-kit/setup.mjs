#!/usr/bin/env node
/**
 * Installs the motion kit into any Next.js (App Router) project.
 *
 *   node setup.mjs <path-to-your-next-project> [--force] [--no-install] [--no-template]
 *
 * What it does:
 *   1. Copies the motion/ folder into src/motion (or ./motion if the project has no src/ folder)
 *   2. Installs gsap, @gsap/react and lenis with the project's own package manager
 *   3. Creates app/template.tsx with page transitions (only if you don't have one already)
 *   4. Prints the one change you still make yourself, in app/layout.tsx
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const target = resolve(args.find((a) => !a.startsWith("--")) ?? ".");

const fail = (msg) => {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
};

// ---- 1. Check this is a Next.js project ----
const pkgPath = join(target, "package.json");
if (!existsSync(pkgPath)) fail(`No package.json in ${target}. Point the script at your project folder.`);
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const deps = { ...pkg.dependencies, ...pkg.devDependencies };
if (!deps.next) fail("This doesn't look like a Next.js project (no \"next\" in package.json).");

const srcDir = existsSync(join(target, "src", "app")) || existsSync(join(target, "src", "pages"))
  ? join(target, "src")
  : target;
const appDir = join(srcDir, "app");
if (!existsSync(appDir)) {
  console.warn("⚠ No app/ folder found. The kit is built for the App Router; page transitions won't apply.");
}

// ---- 2. Copy the kit ----
const dest = join(srcDir, "motion");
if (existsSync(dest) && !flag("force")) {
  fail(`${relative(target, dest)} already exists. Re-run with --force to overwrite it.`);
}
cpSync(join(here, "motion"), dest, { recursive: true });
console.log(`✔ Copied the kit to ${relative(target, dest) || "motion"}/`);

// ---- 3. Install dependencies ----
const has = (file) => existsSync(join(target, file));
const pm = has("pnpm-lock.yaml")
  ? "pnpm add"
  : has("yarn.lock")
    ? "yarn add"
    : has("bun.lockb") || has("bun.lock")
      ? "bun add"
      : "npm install";
const installCmd = `${pm} gsap @gsap/react lenis`;

if (flag("no-install")) {
  console.log(`• Skipped install. Run this yourself: ${installCmd}`);
} else {
  console.log(`… ${installCmd}`);
  try {
    execSync(installCmd, { cwd: target, stdio: "inherit" });
    console.log("✔ Installed gsap, @gsap/react, lenis");
  } catch {
    fail(`Install failed. Run it yourself inside the project: ${installCmd}`);
  }
}

// ---- 4. Page transitions ----
const hasTemplate = ["tsx", "jsx", "ts", "js"].some((ext) => existsSync(join(appDir, `template.${ext}`)));
if (existsSync(appDir) && !hasTemplate && !flag("no-template")) {
  writeFileSync(
    join(appDir, "template.tsx"),
    `import { PageTransition } from "../motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
`,
  );
  console.log("✔ Created app/template.tsx (page transitions)");
} else if (hasTemplate) {
  console.log("• You already have app/template.tsx — wrap its content in <PageTransition> if you want page transitions.");
}

// ---- 5. Last step ----
console.log(`
Last step — in app/layout.tsx:

  import { MotionProvider } from "../motion";

  <body>
    <MotionProvider preset="studio">{children}</MotionProvider>
  </body>

Presets: "luxury" | "studio" | "snappy" | "minimal"
Then use <Reveal>, <SplitReveal>, <Parallax>, <Counter>, <Magnetic>, <Marquee>, <HorizontalScroll> anywhere.
`);
