module.exports = function(grunt) {
  grunt.initConfig({
    express: {
        options: {
          // Override defaults here
        },
        development: {
          options: {
            node_env: 'development',
            script: 'server.js'
          }
        },
        production: {
          options: {
            node_env: 'production',
            script: 'server.js'
          }
        },
        test: {
          options: {
            node_env: 'test',
            script: 'server.js'
          }
        },
        preTest:{
          options: {
            node_env: 'test',
            script: 'test/prepareDbForTest.js'
          }
        }
    },
    watch: {
        express: {
          //files:  [ '**/*.js' ],
          files:  [ 'server.js' ],
          tasks:  [ 'express:development' ],
          options: {
            spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
          }
        }
    },
    mochaTest: {
      test: {
        options: {
          node_env: 'test',
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/server.spec.js']
      }
    },
    wait: {
       options: {
           delay: 5000
       },
       pause: {
            options: {
                before : function(options) {
                    console.log('pausing %dms', options.delay);
                },
                after : function() {
                    console.log('pause end');
                }
            }
      }
   }
  });
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-wait');
  grunt.registerTask('development', ['express:development','watch']);
  grunt.registerTask('test', ['express:preTest','wait:pause','express:test','mochaTest:test']);
};
