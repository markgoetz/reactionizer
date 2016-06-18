module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
       // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: 'dist/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: ['src/js/*'],
      tasks: ['babel', 'concat', 'uglify']
    },
    babel: {
      options: {
        presets: ['react'],
        sourceMap: 'none'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/js/',
            src: ['*.jsx'],
            ext: '.js',
            dest: 'src/js/'
          }
        ]
      }
    },
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss'],
            ext: '.css',
            dest: 'dist/css'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
 

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};