const {replaceBetween} = require("./src/helpers/index");

module.exports = function(grunt) {
    grunt.initConfig({
        replace: {
            app_version_patch: {
                src: ['.env', '.env.example'],             // source files array (supports minimatch)
                overwrite: true,             // destination directory or file
                replacements: [{
                    from: /'\d+\.\d+\.\d+'/g,      // regex replacement ('Fooo' to 'Mooo')
                    to: patchUpdate
                }]
            },
            app_version_minor: {
                src: ['.env', '.env.example'],             // source files array (supports minimatch)
                overwrite: true,             // destination directory or file
                replacements: [{
                    from: /'\d+\.\d+\.\d+'/g,      // regex replacement ('Fooo' to 'Mooo')
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

// TODO: Change package.json too?
const patchUpdate = matchedWord => {
    matchedWord = matchedWord.replaceAll('\'', '');
    const numberToUpdate = parseInt(matchedWord.substring(4));
    const numberUpdated = numberToUpdate + 1;

    const finalVersion = `'${replaceBetween(matchedWord, numberUpdated, 4, matchedWord.length)}'`;

    console.log(`New version set to ${finalVersion}`);

    return finalVersion;
}

const minorUpdate = matchedWord => {
    matchedWord = matchedWord.replaceAll('\'', '');
    const numberToUpdate = parseInt(matchedWord.substring(2, 3));
    const numberUpdated = numberToUpdate + 1;
    const minorVersion = replaceBetween(matchedWord, numberUpdated, 2, 3);
    const finalVersion = `'${replaceBetween(minorVersion, '0', 4, minorVersion.length)}'`

    console.log(`New version set to ${finalVersion}`);

    return finalVersion;
}