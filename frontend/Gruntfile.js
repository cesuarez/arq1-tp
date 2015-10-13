'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    angularFiles: ['app/angular/**/*.js'],
    htmlPartialFiles: ['app/partials/*.html'],
    cssFiles: ['app/css/*.css'],
    assetsFiles: ['app/assets/*'],
    indexFile: ['index.html'],
    backendPublicPath: '../public',
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'app/angular/**/*.js'],
      options: {
        jshintrc: './.jshintrc'
      },
    },
    watch: {
      bower: {
        files: ['bower_components/*'],
        tasks: ['wiredep', 'useminPrepare', 'concat:generated']
      },
      resources: {
        files: ['<%= cssFiles %>', '<%= htmlPartialFiles %>', '<%= assetsFiles %>'],
        tasks: ['copy:main', 'usemin'],
      },
      htmlIndex: {
        files: ['<%= indexFile %>'],
        tasks: ['wiredep', 'useminPrepare', 'copy:main', 'usemin', 'concat:generated'],
      },
      js: {
        files: ['<%= angularFiles %>'],
        tasks: ['jshint', 'concat:dist'],        
        options: {
          spawn: false,
        },
      },
      options: {
        livereload: true,
      },
    },
    wiredep: {
      task: {
        src: [
          'index.html',
        ]
      }
    },
    clean: {
      options: { force: true },
      build: ['dist'],
      backend: [
        '<%= backendPublicPath %>/assets', 
        '<%= backendPublicPath %>/partials', 
        '<%= backendPublicPath %>/css', 
        '<%= backendPublicPath %>/js',
        '<%= backendPublicPath %>/app.html'
      ],
    },
    concat: {
      dist: {
        // the files to concatenate
        src: ['<%= angularFiles %>'],
        // the location of the resulting JS file
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, cwd: 'app/', src: ['assets/**'], dest: 'dist/'},
          {expand: true, cwd: 'app/', src: ['partials/**'], dest: 'dist/'},
          {expand: true, cwd: 'app/', src: ['css/**'], dest: 'dist/'},
          {expand: true, src: ['index.html'], dest: 'dist/'},
        ],
      },
      backend: {
        files: [
          {expand: true, cwd: 'dist/', src: ['assets/**'], dest: '<%= backendPublicPath %>'},
          {expand: true, cwd: 'dist/', src: ['partials/**'], dest: '<%= backendPublicPath %>'},
          {expand: true, cwd: 'dist/', src: ['css/**'], dest: '<%= backendPublicPath %>'},
          {expand: true, cwd: 'dist/', src: ['js/**'], dest: '<%= backendPublicPath %>'},
          {expand: true, cwd: 'dist/', src: ['index.html'], dest: '<%= backendPublicPath %>', 
            rename: function(dest, src) {
              return dest + '/app.html';
            }
          },
        ]
      }
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist',
        flow: {
          steps: {
            js: ['concat'],
            css: ['concat']
          },
          post: {}
        }
      }
    },
    usemin: {
        html: ['dist/index.html']
    },
    'http-server': {
        dev: {
            // the server root directory
            root: './dist/',
            port: 8080,
            host: '0.0.0.0',
            showDir : false,
            autoIndex: true,
            ext: 'html',
            // run in parallel with other tasks
            runInBackground: true,
        }
    },
    shell: {
      phpServer: {
        command: 'php -S0.0.0.0:8080 -t <%= backendPublicPath %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-usemin');

  // TODO: hacer andar la conversion de anotaciones para DI
  // grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['clean:build', 'wiredep', 'useminPrepare', 'jshint', 'concat:dist', 'copy:main', 'usemin', 'concat:generated']);
  grunt.registerTask('serve:js', ['build', 'http-server', 'watch']);
  grunt.registerTask('serve:php', ['build', 'clean:backend', 'copy:backend', 'shell:phpServer']);
  grunt.registerTask('default', ['serve:js']);
  
};
