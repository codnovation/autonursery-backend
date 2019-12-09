"use strict";

const fs = require('fs');
const path = require('path');

let lib = {
    findRoot: function () {
        let cwd = process.cwd();
        let rootPath = cwd;
        let newRootPath = null;
        while (!fs.existsSync(path.join(process.cwd(), "node_modules/grunt"))) {
            process.chdir("..");
            newRootPath = process.cwd();
            if (newRootPath === rootPath) {
                return;
            }
            rootPath = newRootPath;
        }
        process.chdir(cwd);
        return rootPath;
    },
    loadTasks: function (grunt, rootPath, tasks) {
        tasks.forEach(function (name) {
            if (name === 'grunt-cli') {
                return;
            }
            let cwd = process.cwd();
            process.chdir(rootPath); // load files from proper root, I don't want to install everything locally per module!
            grunt.loadNpmTasks(name);
            process.chdir(cwd);
        });
    }
};

module.exports = function (grunt) {
    // Project configuration.
    let pluginsRootPath = lib.findRoot();
    lib.loadTasks(grunt, pluginsRootPath, ['grunt-contrib-jshint']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                "bitwise": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "esversion": 9,
                "forin": true,
                "latedef": "nofunc",
                "leanswitch": true,
                "maxerr": 100,
                "noarg": true,
                "nonbsp": true,
                "strict": "global",
                "undef": true,
                "unused": true,
                "varstmt": true,

                //"validthis": true,
                //"loopfunc": true,
                "sub": true,
                //"supernew": true,

                "node": true,

                "globals": {
                    "describe": false,
                    "it": false,
                    "before": false,
                    "beforeEach": false,
                    "after": false,
                    "afterEach": false
                }
            },
            files: {
                src: ['Gruntfile.js', 'app.js', 'middleWare/**.js', 'models/**.js', 'passport/**.js', 'routes/**/**.js']
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }
        },
    });

    // Default task(s).
    grunt.registerTask("default", ['jshint']);

};