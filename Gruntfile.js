module.exports = function (grunt) {
  //Do grunt-related things in here

  //Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
        options: {
          // point all tasks to karma config file
          configFile: 'karma.conf.js'
        },
        unit: {
          // run tests once instead of continuously
          singleRun: true
        }
    },
    uglify: {
      options: {
        banner: '/*\n<%= pkg.name %> JS files. \n\nMinified on: <%= grunt.template.today("yyyy-mm-dd hh:MM:ss") %> IST\n */\n'
      },
      build: {
        src: ['app/scripts/**/*.js', 'app/scripts/app.js'],
        dest: 'build/scripts.min.js'
      }
    },
    jshint: {
        all: ['Gruntfile.js', 'app/scripts/**/*.js', 'app/scripts/app.js']
    }
  });

  // Load the plugin that provides the “uglify” task
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Load the plugin that provides the “jshint” task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  //Load the plugin that provides the “karma” task
  grunt.loadNpmTasks('grunt-karma');

  // Default task(s)
  grunt.registerTask('default', ['jshint', 'uglify']);
};
