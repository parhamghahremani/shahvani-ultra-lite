/**
 * Build script for Shahvani Ultra Lite
 * Creates versioned releases in versions/ folder and updates dist/
 */

const fs = require("fs");
const path = require("path");

const SRC_FILE = "src/shahvani-ultra-lite.user.js";
const VERSIONS_DIR = "versions";
const DIST_DIR = "dist";
const DIST_FILE = "shahvani-ultra-lite.user.js";

function readVersion() {
    const content = fs.readFileSync(SRC_FILE, "utf-8");
    const match = content.match(/@version\s+([\d.]+)/);
    return match ? match[1] : "0.0.0";
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function build() {
    const version = readVersion();

    ensureDir(VERSIONS_DIR);
    ensureDir(DIST_DIR);

    let content = fs.readFileSync(SRC_FILE, "utf-8");

    // Strip any existing @downloadURL/@updateURL lines (in case src already has them)
    content = content.replace(/^\s*\/\/\s*@downloadURL\s+.*$/gm, '');
    content = content.replace(/^\s*\/\/\s*@updateURL\s+.*$/gm, '');

    const stableUrl = `https://raw.githubusercontent.com/parhamghahremani/shahvani-ultra-lite/main/dist/${DIST_FILE}`;

    // Add @downloadURL/@updateURL after @grant line to any content
    const addUrls = (c) => c.replace(
        /(@grant\s+none)/,
        `$1\n// @downloadURL  ${stableUrl}\n// @updateURL    ${stableUrl}`
    );

    // Create versioned release (archive - WITH update URLs per convention from v3.6.1+)
    const versionedFile = path.join(VERSIONS_DIR, `v${version}.user.js`);
    const versionedContent = addUrls(content);
    fs.writeFileSync(versionedFile, versionedContent);
    console.log(`Created versioned archive: ${versionedFile} (with update URLs)`);

    // Create dist file (latest) with @downloadURL/@updateURL pointing to stable dist/ file
    const distFile = path.join(DIST_DIR, DIST_FILE);
    const distContent = addUrls(content);
    fs.writeFileSync(distFile, distContent);
    console.log(`Created dist file with stable URLs: ${distFile}`);
    console.log(`  URLs: ${stableUrl}`);

    console.log(`\nBuild complete! Version: ${version}`);
    console.log(`Files:`);
    console.log(`  - ${versionedFile} (archive with update URLs)`);
    console.log(`  - ${distFile} (stable update target)`);
}

build();