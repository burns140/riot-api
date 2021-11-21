const FILE_NAMES = require("../../common/Constants").FILE_NAMES;
const DEFAULTS = require("../../resources/defaults.json");
const fs = require("fs");

/**
 * @classdesc Checks for necessary files. Creates them and writes default data to them if they don't exist.
 */
module.exports = class FileManager {
    /**
     * @description Creates missing files if necessary
     */
    static verifyAndCreateFiles() {
        for (const fileName in FILE_NAMES) {
            const str = `${process.cwd()}${FILE_NAMES[fileName]}`.replace(/\\/g, "/");
            const data = DEFAULTS[fileName];
            try {
                fs.writeFileSync(str, JSON.stringify(data, null, 4), { flag: "wx" });
            } catch {
                console.log("file already exists")
            }
        }
    }
}