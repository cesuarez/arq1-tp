'use strict';

module.exports = function(grunt) {
  
  // LOAD ALL grunt tasks
  require('load-grunt-tasks')(grunt);

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
      files: [
        'bower_components/*', 
        '<%= cssFiles %>', 
        '<%= htmlPartialFiles %>', 
        '<%= assetsFiles %>', 
        '<%= indexFile %>', 
        '<%= angularFiles %>'
      ],
      tasks: ['build'],
      options: {
        livereload: true
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
        options: {
          separator: ';',
        },
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
          {expand: true, cwd: 'app/', src: ['fonts/**'], dest: 'dist/'},
          {expand: true, cwd: 'app/', src: ['assets/**'], dest: 'dist/'},
          {expand: true, cwd: 'app/', src: ['partials/**'], dest: 'dist/'},
          {expand: true, cwd: 'app/', src: ['css/**'], dest: 'dist/'},
          {expand: true, src: ['index.html'], dest: 'dist/'},
        ],
      },
      backend: {
        files: [
          {expand: true, cwd: 'dist/', src: ['fonts/**'], dest: '<%= backendPublicPath %>'},
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
      },
      openshift: {
        command: 'cp -f ../.gitignore-openshift ../.gitignore'
      },
    },
    concurrent: {
        serve: ['watch', 'shell:phpServer'],
        options: {
            logConcurrentOutput: true
        }
    }
  });

  grunt.registerTask('build', ['clean:build', 'wiredep', 'useminPrepare', 'jshint', 'concat:dist', 'copy:main', 'usemin', 'concat:generated', 'clean:backend', 'copy:backend']);
  grunt.registerTask('serve:js', ['build', 'http-server', 'watch']);
  grunt.registerTask('serve:php', ['build', 'concurrent:serve']);
  grunt.registerTask('predeploy', ['build', 'shell:openshift']);
  grunt.registerTask('default', ['serve:php']);
  
};
