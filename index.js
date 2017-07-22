/**
 * Attention: My english is not good enough. Sorry.
 * 
 * @author Mateus Gabi Moreira
 */
var fs = require('fs');

/**
 * possibles filenames
 */
var licenses_filenames = [
    "LICENSE",
    "LICENSE.MD",
    "LICENSE.md",
    "license",
    "license.md",
    "LICENSE.TXT",
    "LICENSE.txt",
    "licensse.txt"
];

/**
 * A crawler function that search <code>package.json</code> file into node_module/ directory.
 * 
 * @param {*} directory name 
 */
var readDirectory = function (dirname){

    fs.readdirSync(dirname).forEach(file => {

        if(file == ".bin") { return; };

        if (file == "package.json") {
            fs.readFile(dirname+ "/" +file, 'utf8', function (err, data) {
    
                if (err) {
                    return console.error("Error", err);
                }

                var object = JSON.parse(data);

                if (
                    object.name == "<%= htmlComponentName %>" ||
                    object.name == "undefined" ||
                    object.version == "undefined" ||
                    object.license == "undefined"
                ) {
                    return;
                }

                console.log("Name:", object.name);
                console.log("Version:", object.version);
                console.log("License:", object.license);
                console.log();
            });
        }

        try {
            if(fs.lstatSync(dirname+ "/" +file).isDirectory()) {
                readDirectory(dirname+ "/" +file);
            }
        }
        catch(e){ return; }

    });
};


readDirectory("./node_modules/");