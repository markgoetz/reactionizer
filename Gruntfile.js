module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
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
    eslint: {
      target: 'src/js/*.js',
      options: {
        configFile: 'eslintrc.json'
      }
    },
    watch: {
      js: {
        files: ['src/js/*'],
        tasks: ['babel', 'concat', 'eslint', 'uglify']
      },
      scss: {
        files: ['src/scss/*'],
        tasks: ['sass', 'cssmin']
      }
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
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
 

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compilejs', ['babel', 'eslint', 'concat', 'uglify']);
  grunt.registerTask('compilescss', ['sass', 'cssmin']);
};