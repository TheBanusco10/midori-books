const {replaceBetween} = require("./src/helpers/index");

module.exports = function(grunt) {
    grunt.initConfig({
        replace: {
            app_version_patch: {
                src: ['.env', '.env.example', 'package.json'],
                overwrite: true,
                replacements: [{
                    from: /VUE_APP_VERSION='\d+.\d+.\d+'|"version": "\d+.\d+.\d+"/g,
                    to: patchUpdate
                }]
            },
            app_version_minor: {
                src: ['.env', '.env.example', 'package.json'],
                overwrite: true,
                replacements: [{
                    from: /VUE_APP_VERSION='\d+.\d+.\d+'|"version": "\d+.\d+.\d+"/g,
                    to: minorUpdate
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('update_app_version', 'Update the app version', function(arg1) {
        switch (arg1) {
            case 'patch':
                grunt.task.run('replace:app_version_patch');
                break;
            case 'minor':
                grunt.task.run('replace:app_version_minor');
                break;
        }
    });
};

const patchUpdate = matchedWord => {
    console.log(matchedWord)
    const {replaceQuotes, fullVersion, versionStartPosition} = getVersionInformation(matchedWord);

    const numberToUpdate = parseInt(fullVersion.substring(4));

    const numberUpdated = numberToUpdate + 1;

    const fullVersionUpdated = `${replaceQuotes}${replaceBetween(fullVersion, numberUpdated, 4, fullVersion.length)}${replaceQuotes}`;

    const finalVersion = `${replaceBetween(matchedWord, fullVersionUpdated, versionStartPosition, matchedWord.length)}`;

    console.log(`New version set to ${finalVersion}`);

    return finalVersion;
}

const minorUpdate = matchedWord => {
    const {replaceQuotes, fullVersion, versionStartPosition} = getVersionInformation(matchedWord);

    const numberToUpdate = parseInt(fullVersion.substring(2, 3));

    const numberUpdated = numberToUpdate + 1;

    let fullVersionUpdated = `${replaceQuotes}${replaceBetween(fullVersion, numberUpdated, 2, 3)}${replaceQuotes}`;
    fullVersionUpdated = `${replaceBetween(fullVersionUpdated, '0', 5, fullVersionUpdated.length)}`;

    const finalVersion = `${replaceBetween(matchedWord, fullVersionUpdated, versionStartPosition, matchedWord.length)}${replaceQuotes}`;

    console.log(`New version set to ${finalVersion}`);

    return finalVersion;
}

/**
 * Returns some information about the version string
 *
 * @param matchedWord
 * @returns {{fullVersion: string, replaceQuotes: string, versionStartPosition: *}}
 */
const getVersionInformation = matchedWord => {
    let replaceQuotes = '\'';
    let versionStartPosition = matchedWord.indexOf('=\'');

    // If it's package.json
    if (versionStartPosition === -1) {
        versionStartPosition = matchedWord.indexOf(' \"');
        replaceQuotes = '"';
    }

    versionStartPosition += 1;

    const fullVersion = matchedWord.substring(versionStartPosition).replaceAll(replaceQuotes, '');

    return {
        versionStartPosition,
        replaceQuotes,
        fullVersion
    }
}