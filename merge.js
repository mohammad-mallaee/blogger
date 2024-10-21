const fs = require("fs/promises");

async function merge() {
    await fs.rm("public", {recursive: true, force: true});
    await fs.rename("content", "public");
    await fs.cp("settings/config.blog.js", "config.blog.js");
    await fs.cp("settings/extra.css", "app/utils/extra.css").catch(() => {});
    await fs.cp("settings/font.ts", "app/utils/font.ts").catch(() => {});
}

merge()