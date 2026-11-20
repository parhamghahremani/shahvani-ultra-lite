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

    const content = fs.readFileSync(SRC_FILE, "utf-8");

    // Create versioned release
    const versionedFile = path.join(VERSIONS_DIR, `v${version}.user.js`);
    fs.writeFileSync(versionedFile, content);
    console.log(`Created versioned release: ${versionedFile}`);

    // Create dist file (latest) with stable update URLs pointing to dist/
    const distFile = path.join(DIST_DIR, DIST_FILE);
    let distContent = content
        .replace(
            /@downloadURL\s+.*/,
            `@downloadURL  https://raw.githubusercontent.com/parhamghahremani/shahvani-ultra-lite/main/dist/${DIST_FILE}`
        )
        .replace(
            /@updateURL\s+.*/,
            `@updateURL    https://raw.githubusercontent.com/parhamghahremani/shahvani-ultra-lite/main/dist/${DIST_FILE}`
        );

    fs.writeFileSync(distFile, distContent);
    console.log(`Created dist file: ${distFile}`);
    console.log(`Updated dist file with stable URLs`);

    console.log(`\nBuild complete! Version: ${version}`);
    console.log(`Files:`);
    console.log(`  - ${versionedFile}`);
    console.log(`  - ${distFile}`);
}

build();