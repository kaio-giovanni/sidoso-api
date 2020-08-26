var fs = require('fs');

/**
 * Delete the dist folder before running tsc
 */
function deleteFolderRecursive(path) {
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { 
                deleteFolderRecursive(curPath);
            } else { 
                fs.unlinkSync(curPath);
            }
        });
        console.log(`Deleting directory "${path}"...`);
        fs.rmdirSync(path);
    }
};
console.log("Cleaning working tree...");

deleteFolderRecursive("./dist");

console.log("Successfully cleaned working tree!");