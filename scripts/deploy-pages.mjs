// Publica el prototipo en GitHub Pages (rama gh-pages) — copiar a <proyecto>/scripts/.
//
//   npm run deploy:pages            → compila, publica y espera a que GitHub Pages esté listo
//   npm run deploy:pages -- --local → solo compila en out/ (para revisar sin publicar)
//
// Requisitos: remoto `origin` en GitHub, `gh` autenticado (permiso repo) y next.config que
// use PAGES_BASE_PATH cuando GITHUB_PAGES=1 (ver assets/starter/next.config.ts de la skill).
// Opcional: SERVER_ONLY_PATHS="src/app/api,src/app/admin" aparta rutas que necesitan servidor
// durante la compilación (se restauran siempre al terminar).
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const localOnly = process.argv.includes("--local");
const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const read = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const remote = read("git remote get-url origin");
const match = remote.match(/github\.com[/:]([^/]+)\/([^/]+?)(\.git)?$/);
if (!match) throw new Error(`El remoto origin no es de GitHub: ${remote}`);
const [, owner, repo] = match;
const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const basePath = isUserSite ? "" : `/${repo}`;
const siteUrl = `https://${owner.toLowerCase()}.github.io${basePath}`;
const out = path.join(root, "out");

// 1 · Compilación estática (apartando rutas de servidor si se indicaron)
const serverOnly = (process.env.SERVER_ONLY_PATHS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
const backup = path.join(root, ".static-export-backup");
if (existsSync(backup)) throw new Error(`Existe ${backup}: restaura su contenido en src/ antes de continuar.`);
const moved = [];
try {
  if (serverOnly.length) mkdirSync(backup);
  for (const rel of serverOnly) {
    const from = path.join(root, rel);
    if (!existsSync(from)) continue;
    const to = path.join(backup, rel.replace(/[\\/]/g, "__"));
    renameSync(from, to);
    moved.push([from, to]);
  }
  rmSync(out, { recursive: true, force: true });
  console.log(`\n▶ Compilando para ${siteUrl}/\n`);
  run("npx next build", { env: { ...process.env, GITHUB_PAGES: "1", PAGES_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl } });
} finally {
  for (const [from, to] of moved.reverse()) renameSync(to, from);
  rmSync(backup, { recursive: true, force: true });
}
if (!existsSync(path.join(out, "index.html"))) throw new Error("No se generó out/index.html: ¿next.config tiene output: \"export\"?");

// 2 · Ajustes para un hosting estático
writeFileSync(path.join(out, ".nojekyll"), ""); // si no, GitHub ignora la carpeta _next/

// Next 16 guarda los datos de precarga de rutas en carpetas (`__next.<segmento>/…/__PAGE__.txt`)
// pero el navegador los pide con los segmentos unidos por puntos: se crean copias con ese nombre.
(function flatten(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const rel of readdirSync(full, { recursive: true })) {
        const src = path.join(full, rel);
        if (statSync(src).isFile()) copyFileSync(src, path.join(dir, `${entry.name}.${rel.split(path.sep).join(".")}`));
      }
    } else flatten(full);
  }
})(out);

if (!existsSync(path.join(out, "robots.txt"))) {
  writeFileSync(path.join(out, "robots.txt"), ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`, ""].join("\n"));
}
if (!existsSync(path.join(out, "sitemap.xml"))) {
  const pages = [];
  (function collect(dir, rel = "") {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory() && !e.name.startsWith("_") && !e.name.startsWith("__next") && e.name !== "404") collect(path.join(dir, e.name), `${rel}${e.name}/`);
      else if (e.name === "index.html") pages.push(rel);
    }
  })(out);
  writeFileSync(
    path.join(out, "sitemap.xml"),
    ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...pages.map((p) => `  <url><loc>${siteUrl}/${p}</loc></url>`), "</urlset>", ""].join("\n"),
  );
}

if (localOnly) {
  console.log(`\n✓ Vista previa generada en out/ (ruta base "${basePath || "/"}").`);
  process.exit(0);
}

// 3 · Publicar out/ en la rama gh-pages (historial desechable)
console.log("\n▶ Publicando en la rama gh-pages…\n");
rmSync(path.join(out, ".git"), { recursive: true, force: true });
const git = (args) => run(`git ${args}`, { cwd: out });
git("init -q -b gh-pages");
git("add -A");
git(`-c user.name="${owner}" -c user.email="${owner}@users.noreply.github.com" commit -q -m "Vista previa (${new Date().toISOString()})"`);
git(`push -q --force "${remote}" gh-pages`);
rmSync(path.join(out, ".git"), { recursive: true, force: true });

// 4 · Activar GitHub Pages si hace falta y esperar a que termine el build
try {
  read(`gh api repos/${owner}/${repo}/pages`);
} catch {
  try {
    read(`gh api -X POST repos/${owner}/${repo}/pages -f "source[branch]=gh-pages" -f "source[path]=/"`);
    console.log("GitHub Pages activado desde la rama gh-pages.");
  } catch (err) {
    console.warn("No se pudo activar GitHub Pages automáticamente (¿repo privado sin GitHub Pro?):", err.message.split("\n")[0]);
  }
}
let status = "";
for (let i = 0; i < 40; i++) {
  await sleep(5000);
  try {
    status = read(`gh api repos/${owner}/${repo}/pages/builds/latest -q .status`);
  } catch {
    status = "";
  }
  if (status === "built" || status === "errored") break;
}
console.log(status === "built" ? `\n✓ Publicado: ${siteUrl}/` : `\n⚠ Estado de GitHub Pages: "${status || "desconocido"}". Revisa ${siteUrl}/ en unos minutos.`);
