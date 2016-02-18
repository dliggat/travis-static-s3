module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'helpers/*.js'],
      options: {
        reporter: require('jshint-stylish')
      }
    },
    watch: {
      files: ['.jshintrc', '<%= jshint.files %>'],
      tasks: ['jshint']
    },
    assemble: {
      options: {
        helpers: ['helpers/*.js'],
        data: ['data/*.{json,yml}']
      },
      site: {
        options: {
          ext: '.html',
          flatten: true,
          layout: ['layouts/default.hbs']
        },
        src: ['pages/*.md'],
        dest: '_output'
      }
    },
    jsbeautifier: {
      files : ['_output/*.template'],
      options : {
        js: {
          indentSize: 2,
          fileTypes: ['.template'],
          maxPreserveNewlines: 2,
          preserveNewlines: true,
          endWithNewline: true
        }
      }
    },
    jsonlint: {
      sample: {
        src: ['_output/*.template']
      }
    },
    cssmin: {
      target: {
        files: {
          '_output/css/styles.css': [
            'bower_components/skeleton/css/*.css',
            'css/*.css'
          ]
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, cwd: 'img/', src: '**', dest: '_output/img/', filter: 'isFile' }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // grunt.registerTask('render', ['assemble:templates', 'jsbeautifier', 'jsonlint']);
  grunt.registerTask('prepare_site', ['assemble', 'cssmin', 'copy']);
};
