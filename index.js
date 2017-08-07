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
 * NPM File, Bower File...
 */
var json_files = [
    "package.json"
];

/**
* Name of the file that 3PLG will be generate on the root
*/
var TPLGFile = '3PLG.txt';

/**
* Greetings text
*/
var greetings = "This software was gratefully developed using these third-parties softwares:\n\n";

/**
* Sometimes, we just want build a 3PLG File with production dependencies or
* prod + dev dependencies
*/
var only_production_dependencies = false;

var getProjectDependencies = function () {

    /* Read package.json from the project */
    var contents = fs.readFileSync(json_files[0]);

    /* become package.json => object */
    var package = JSON.parse(contents);

    var dependencies = [];

    for (var dependency in package.dependencies) {
        dependencies.push(dependency);
    }

    if(!only_production_dependencies) {
        for (var dependency in package.devDependencies) {
            dependencies.push(dependency);
        }
    }

    /* sort dependencies alphabetically */
    dependencies.sort((a, b) => {
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    return dependencies;
};

/**
 * Recieve a name and return an object {name, version, authors, uri, license}
 *
 * @param {*} name
 */
var getDependencyByName = function (dependency_name) {

    /* Read Package.json from dependency name */
    var contents = fs.readFileSync("node_modules/" + dependency_name + "/package.json");

    var dependency = JSON.parse(contents);

    return {
        name : dependency.name,
        version : dependency.version,
        authors : dependency.author,
        uri : dependency.homepage,
        license: dependency.license
    };
};

var main = function() {

    console.log('\n\n===>>> Starting...\n\n');

    console.log('===>>> Clear 3PLG file...\n\n');
    fs.writeFile(TPLGFile, "");

    fs.appendFile(TPLGFile, greetings);

    var dependencies = getProjectDependencies();

    dependencies.forEach((dependency_name) => {

        var dependency = getDependencyByName(dependency_name);

        var string = "";

        string += dependency.name + '@' + dependency.version + '\n';
        string += dependency.uri + '\n';
        string += dependency.license + '\n\n';

        fs.appendFile(TPLGFile, string, function (err) {

            if (err) console.error('ERR', err);

            console.log('Written: ' + dependency.name + '@' + dependency.version);

        });
    });
};

main();
