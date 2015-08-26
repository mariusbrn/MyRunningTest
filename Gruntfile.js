"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            options: {
                force: true
            },
            before: ["public/"],
            after: [
                "public/scripts/<%= pkg.name %>-head.js",
                "public/scripts/<%= pkg.name %>-body.js",
                "public/styles/<%= pkg.name %>.css"
            ]
        },
        copy: {
            assets: {
                files: [
                    { // Images
                        expand: true,
                        cwd: "app/assets/img/",
                        src: ["**/*.{gif,jpg,png}"],
                        dest: "public/assets/img/"
                    },                
                    {
                        expand: true,
                        cwd: "app/components/",
                        src: ["**/*.html"],
                        dest: "public/components/"
                    }
                ]
            }            
        },
        concat: {
            headScripts: {
                options: {
                    separator: ";"
                },
                src: ["bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"],
                dest: "public/scripts/<%= pkg.name %>-head.js"
            },
            bodyScripts: {
                options: {
                    separator: ";"
                },
                src: [
                    "app/bower_components/angular/angular.js",
                    "app/bower_components/angular-route/angular-route.js",
                    "app/bower_components/angular-animate/angular-animate.js",
                    "app/bower_components/angular-aria/angular-aria.js",
                    "app/bower_components/angular-material/angular-material.js",
                    "app/app.js",
                    "app/components/repos/services.js",
                    "app/components/repos/controllers.js"
                ],
                dest: "public/scripts/<%= pkg.name %>-body.js"
            }
        },
        cssmin: {
            styles: {
                options: {
                    roundingPrecision: -1
                },
                files: {
                    "public/styles/<%= pkg.name %>.min.css": [
                        "app/bower_components/html5-boilerplate/dist/css/normalize.css",
                        "app/bower_components/html5-boilerplate/dist/css/main.css",
                        "app/bower_components/angular-material/angular-material.css",
                        "app/app.css"
                    ]
                }
            }
        },         
        uglify: {
            headScripts: {
                src: ["<%= concat.headScripts.dest %>"],
                dest: "public/scripts/<%= pkg.name %>-head.min.js"
            },
            bodyScripts: {
                src: ["<%= concat.bodyScripts.dest %>"],
                dest: "public/scripts/<%= pkg.name %>-body.min.js"
            }
        },
        replace: {
            html: {
                src: ["app/index.html"],
                dest: "public/index.html",
                replacements: [
                    { // Global styles
                        from: /<!-- @section styles -->[\s\S]*?<!-- @endsection -->/,
                        to: '<link rel="stylesheet" href="styles/<%= pkg.name %>.min.css">'
                    },
                    { // Head scripts (loaded before content)
                        from: /<!-- @section headScripts -->[\s\S]*?<!-- @endsection -->/,
                        to: '<script src="scripts/<%= pkg.name %>-head.min.js"></script>'
                    },
                    { // Body scripts (loaded after content)
                        from: /<!-- @section bodyScripts -->[\s\S]*?<!-- @endsection -->/,
                        to: '<script data-main="scripts/main" src="scripts/<%= pkg.name %>-body.min.js"></script>'
                    }
                ]
            },
            styles: {
                src: ["public/styles/<%= pkg.name %>.min.css"],
                overwrite: true,
                replacements: [
                    { // Bootstrap glyphicons paths
                        from: "../fonts/",
                        to: "../assets/fonts/"
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-text-replace");

    grunt.registerTask("default", [
        "clean:before",
        "copy",
        "concat",
        "cssmin",
        "uglify",
        "replace",
        "clean:after"
    ]);

};
