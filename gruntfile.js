module.exports = (function () {

  'use strict';

  return function (grunt) {

    // Load all the grunt plugins
    require('load-grunt-tasks')(grunt);

    // Config object.
    var config = {
      src: 'src',                                 // working directory
      tests: 'tests',                             // unit tests folder
      dist: 'cordova',                            // distribution folder
      supported: ['ios', 'android'],              // supported platforms
      platform: grunt.option('platform') || 'ios' // current target platform
    };

    grunt.initConfig({

      config: config,

      // Make sure code styles are up to par and there are no obvious mistakes.
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        gruntfile: 'Gruntfile.js',
        src: ['<%= config.src %>/js/**/*.js', '!<%= config.src %>/js/templates.js']
      },

      // Precompile the handlebar templates.
      handlebars: {
        compile: {
          options: {
            amd: true,
            processName: function (filepath) {
              var pieces = filepath.split('/');
              return pieces[pieces.length - 1].split('.')[0];
            }
          },
          src: ['<%= config.src %>/html/{,*/}*.handlebars'],
          dest: '<%= config.src %>/js/templates.js'
        }
      },

      // Grunt server settings
      connect: {
        options: {
          hostname: 'localhost',
          open: true,
          livereload: true
        },
        app: {
          options: {
            middleware: function (connect) {
              return [
                connect.static(config.src),
                connect().use('/bower_components', connect.static('./bower_components'))
              ];
            },
            port: 9000,
            open: {
              target: 'http://localhost:9000/index.<%= config.platform %>.html'
            }
          }
        }
      },

      // Watch files for changes and runs tasks based on the changed files.
      watch: {

        // Watch grunt file.
        gruntfile: {
          files: ['Gruntfile.js'],
          tasks: ['jshint:gruntfile']
        },

        // Watch javascript files.
        js: {
          files: [
            '<%= config.src %>/js/**/*.js',
            '!<%= config.src %>/js/templates.js'
          ],
          tasks: ['jshint:src'],
          options: {
            livereload: true
          }
        },

        // Watch handlebar templates.
        handlebars: {
          files: [
            '<%= config.src %>/html/{,*/}*.handlebars'
          ],
          tasks: ['handlebars'],
          options: {
            livereload: true
          }
        },

        // Watch html and css files.
        livereload: {
          options: {
            livereload: '<%= connect.options.livereload %>'
          },
          files: [
            '<%= config.src %>/index.<%= config.platform %>.html',
            '<%= config.src %>/css/safe.css',
            '<%= config.src %>/css/safe.<%= config.platform %>.css'
          ]
        }
      }
    });

    // Start the server and watch for changes.
    grunt.registerTask('serve', [
      'jshint:src',
      'handlebars',
      'connect',
      'watch'
    ]);
  };
})();
