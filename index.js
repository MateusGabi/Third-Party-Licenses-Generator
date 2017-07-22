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

    if(only_production_dependencies) {
        return dependencies;
    }
   

    for (var dependency in package.devDependencies) {
        dependencies.push(dependency);
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

    var dependencies = getProjectDependencies();
    
    dependencies.forEach((dependency_name) => {

        var dependency = getDependencyByName(dependency_name);
        
        console.log("Name: " + dependency.name);
        console.log("Version: " + dependency.version);
        console.log("Authors: " + dependency.author);
        console.log("Homepage: " + dependency.homepage);
        console.log("License: " + dependency.license);
        console.log();

    });
};

main();