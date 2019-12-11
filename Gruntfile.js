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
    let tasks = ['grunt-contrib-jshint', 'grunt-mocha-test', 'grunt-istanbul', 'grunt-babel',
        'grunt-coveralls', 'grunt-contrib-clean', 'grunt-contrib-copy', 'grunt-env'];
    lib.loadTasks(grunt, pluginsRootPath, tasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env'],
                // plugins: ["@babel/plugin-transform-runtime"],
            },
            dist: {
                files: [{
                    "expand": true,
                    "src": [
                        'test/**/*.js', 'test/*.js', '*.js'
                    ],
                    "dest": "dist/"
                }]
            }
        },

        // JSHint
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

        // Clean doc in coverage
        clean: {
            doc: {
                src: ['doc/']
            },
            coverage: {
                src: ['test/coverage/']
            }
        },

        // Copy to instrument
        copy: {
            main: {
                files: [
                    {expand: true, src: ['package.json'], dest: 'test/coverage/instrument/', filter: 'isFile'},
                ]
            }
        },

        // Environment variables
        env: {
            mochaTest: {
                APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/dist/',
            },
            coverage: {
                APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/dist/'
            }
        },

        // Instrumenting
        instrument: {
            files: ['dist/*.js'],
            options: {
                lazy: true,
                basePath: 'test/coverage/instrument/'
            }
        },

        // Mocha tests
        mochaTest: {
            unit: {
                options: {
                    reporter: 'spec',
                    require: 'babel-register'
                },
                src: ['dist/test/unit/*.js', 'dist/test/unit/**/*.js', 'dist/test/unit/***/**/*.js', 'dist/test/unit/****/***/**/*.js']
            },
            integration: {
                options: {
                    reporter: 'spec',
                    require: 'babel-register'
                },
                src: ['dist/test/integration/*.js', 'dist/test/integration/**/*.js', 'dist/test/integration/***/**/*.js', 'dist/test/integration/****/***/**/*.js']
            }
        },

        // Store coverage reports
        storeCoverage: {
            options: {
                dir: 'test/coverage/reports'
            }
        },

        // Make coverage reports
        makeReport: {
            src: 'test/coverage/reports/**/*.json',
            options: {
                type: 'lcov',
                dir: 'test/coverage/reports',
                print: 'detail'
            }
        },

        coveralls: {
            options: {
                // LCOV coverage file relevant to every target
                src: 'test/coverage/reports/lcov.info',

                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },
            your_target: {
                // Target-specific LCOV coverage file
                src: 'test/coverage/reports/lcov.info'
            }
        }
    });

    // Default task(s).
    grunt.registerTask("default", ['jshint']);
    grunt.registerTask('test', ['mocha']);
    grunt.registerTask("coverage", ['clean', 'copy', 'babel', 'env:coverage', 'instrument', 'mochaTest', 'mochaTest', 'storeCoverage', 'makeReport', 'coveralls']);
};