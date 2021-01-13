const fs = require("fs");
const archiver = require("archiver");

try { fs.mkdirSync("bin") } catch (_) {}
const xps = fs.createWriteStream("bin/whichmark.xpi");

const zip = archiver("zip");

zip.on("close", () => console.log("Done\n"));

zip.pipe(xps);

const include = ["manifest.json", "icon.png", "options", "bin"];

for (const dirent of include) {
   console.log(`ADD ${dirent}`);
   const stats = fs.statSync(dirent);
   if (stats.isDirectory()) {
      console.info(`DIR ${dirent}`);
      zip.directory(dirent);
      continue;
   }

   if (stats.isFile()) {
      console.info(`FIL ${dirent}`);
      zip.file(dirent);
      continue;
   }
   console.info(`BAD ${dirent}`);
}

zip.finalize();
