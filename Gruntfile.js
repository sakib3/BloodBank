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
      prod: {
        options: {
          node_env: 'production',
          script: 'server.js'
        }
      }
  },
  watch: {
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:development' ],
        options: {
          spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
        }
      }
  }
});
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('development', ['express:development','watch']);

};