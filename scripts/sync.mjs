#!/usr/bin/env node
// Copies skills from the canonical repo (github.com/Nolpak14/getregdata, local ../getregdata)
// into each plugin folder of this repo. The canonical repo stays the only place skills are
// edited; this repo is a packaging layer for the Claude plugin directory.
//
//   node scripts/sync.mjs           copy (overwrite) every listed skill
//   node scripts/sync.mjs --check   exit 1 if any plugin copy differs from the canonical skill
//
// Why copies and not symlinks: a plugin installs only its own folder, the directory rejects
// paths that leave it, and symlinks break on Windows and in scanners.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CANON = path.resolve(process.env.GETREGDATA_REPO || path.join(ROOT, '..', 'getregdata'), 'skills');
const CHECK = process.argv.includes('--check');

// plugin folder -> skills it ships. registry-lookups = free skills that need no key at all
// (keyed free skills join once they take their key through userConfig instead of $ENV).
const PLUGINS = {
  'plugins/getregdata-registry-lookups': [
    'poland-company-registry', 'czech-company-registry', 'norway-company-registry', 'finland-company-registry',
    'france-company-lookup', 'latvia-company-registry', 'lithuania-company-registry', 'romania-company-registry',
    'vies-vat-validation', 'gleif-lei-lookup', 'sec-edgar-us', 'brazil-cnpj', 'costa-rica-hacienda',
    'dominican-republic-rnc', 'hong-kong-companies', 'israel-companies-registry', 'singapore-acra',
    'thailand-dbd', 'vietnam-business', 'sanctions-pep-screening', 'icij-offshore-leaks',
    'eu-transparency-register', 'eu-financial-transparency', 'eu-ted-procurement', 'us-federal-awards',
    'world-bank-contracts',
  ],
};

const norm = (b) => b.toString('utf8').replace(/\r\n/g, '\n');
function filesUnder(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...filesUnder(p)); else out.push(p);
  }
  return out;
}

let drift = 0, copied = 0;
for (const [plugin, skills] of Object.entries(PLUGINS)) {
  const dest = path.join(ROOT, plugin, 'skills');
  const present = fs.existsSync(dest) ? fs.readdirSync(dest) : [];
  for (const extra of present.filter((s) => !skills.includes(s))) {
    drift++; console.log(`EXTRA   ${plugin}/skills/${extra} (not in the list)`);
    if (!CHECK) fs.rmSync(path.join(dest, extra), { recursive: true });
  }
  for (const s of skills) {
    const src = path.join(CANON, s);
    if (!fs.existsSync(path.join(src, 'SKILL.md'))) { console.error(`MISSING canonical skill ${s}`); process.exit(1); }
    for (const f of filesUnder(src)) {
      const rel = path.relative(src, f);
      const to = path.join(dest, s, rel);
      const same = fs.existsSync(to) && norm(fs.readFileSync(to)) === norm(fs.readFileSync(f));
      if (same) continue;
      drift++;
      if (CHECK) { console.log(`DRIFT   ${plugin}/skills/${s}/${rel}`); continue; }
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.writeFileSync(to, norm(fs.readFileSync(f)));
      copied++;
    }
  }
}
if (CHECK) { console.log(drift ? `${drift} file(s) out of sync - run node scripts/sync.mjs` : 'in sync'); process.exit(drift ? 1 : 0); }
console.log(`copied ${copied} file(s)`);
