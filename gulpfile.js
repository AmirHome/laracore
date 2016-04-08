/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |

var elixir = require('laravel-elixir');
elixir(function(mix) {
    mix.sass('app.scss');
});
 */
/*
$ npm install gulp -g
$ npm init
$ npm install gulp gulp-useref gulp-if gulp-uglify gulp-cssnano del gulp-livereload gulp-clean gulp-replace gulp-htmlmin --save-dev
*/
var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    htmlmin = require('gulp-htmlmin')
    ;

// Paths variables
var paths = {
    'local':{
      'project':'signal',
      'root':'E:/xampp/htdocs/',
      // 'gulpBuild':'gulpBuild/resources',
    },
    'dev': {
        'css': 'gulpBuild/resources/assets/css',
        'js': 'gulpBuild/resources/assets/js',
        'font': 'gulpBuild/resources/assets/fonts',
        'view':'gulpBuild/resources/views',
        // 'localgulp': 'D:/xampp/htdocs/signalgulp/resources',
    },
    'assets': {
        'css': 'resources/assets/css',
        'js': 'resources/assets/js',
        'font': 'resources/assets/fonts/**/*',
        'view':'resources/views/**/*.php',
    }

};

gulp.task('hello', function() {
  console.log( '!'+paths.local.root+paths.local.project+'_min/amir/**/*');
});

gulp.task('useref',['clean'], function(){
  return gulp.src(paths.assets.view)


    .pipe(replace("{{ asset('resources/assets') }}", 'resources/assets'))
    // .pipe(replace(/foo(.{3})/g, '$1foo'))
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    
    .pipe(gulp.dest(paths.dev.view))
    
    .pipe(replace('../assets', "{{ asset('resources/assets') }}"))

    // .pipe(gulpIf(['/js/*.js', 'css/*.css'], gulp.dest('gulpBuild/resources/assets')))

    .pipe(gulpIf('*.php', htmlmin({
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments:        true,
                minifyJS:              true,
              })))

    .pipe(gulpIf('*.php', gulp.dest(paths.dev.view)))
});

gulp.task('htmlmin',['clean'], function() {
  return gulp.src(paths.assets.view)
    .pipe(htmlmin({
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    // removeComments:        true,
                    // minifyJS:              true,
                  }))
    .pipe(gulp.dest(paths.dev.view))
});

gulp.task('clean', function() {
  return del.sync(['gulpBuild/resources/**',
                    '!gulpBuild/resources/assets/',
                    '!gulpBuild/resources/views/',
                    ]);
});

// Default task
gulp.task('default', function() {
  gulp.start(['useref']);
});

// git test master

gulp.task('min',['clean_min'], function() {
 return gulp.src([paths.local.root+paths.local.project+'/**'
                ,'!'+paths.local.root+paths.local.project+'/node_modules/**'
                ,'!'+paths.local.root+paths.local.project+'/node_modules'
                ,'!'+paths.local.root+paths.local.project+'/.git/**'
                ,'!'+paths.local.root+paths.local.project+'/.git'
                ,'!'+paths.local.root+paths.local.project+'/storage/framework/views/**/*'
                ,'!'+paths.local.root+paths.local.project+'/storage/framework/cache/**/*'
                ,'!'+paths.local.root+paths.local.project+'/storage/framework/sessions/**/*'
                ,'!'+paths.local.root+paths.local.project+'/gulpBuild/**'
                ,'!'+paths.local.root+paths.local.project+'/gulpBuild'
                ],{dot: true})
            .pipe(gulp.dest(paths.local.root+paths.local.project+'_min'));
});

gulp.task('clean_min', ['useref'], function() {
  return del([
    paths.local.root+paths.local.project+'_min/**'
    ,'!'+paths.local.root+paths.local.project+'_min'
    // ,'!'+paths.local.root+paths.local.project+'_min/amir/**'
    ,'!'+paths.local.root+paths.local.project+'_min/.git/**'
                  ], {force: true,dot: true});
});

gulp.task('copy_gulpBuild',['min'] , function() {
 return gulp.src([paths.local.root+paths.local.project+'/gulpBuild/**'],{dot: true})
            .pipe(gulp.dest(paths.local.root+paths.local.project+'_min'));
});

// Watch
gulp.task('watch', function() {

  var livereloadPage = function () {
    // Reload the whole page
    livereload.reload();
  };

  // Watch .blade lang files
  gulp.watch(paths.assets.view, livereloadPage);
  gulp.watch('app/helpers.php', livereloadPage);
  gulp.watch('resources/lang/**/*.php', livereloadPage);

  // gulp.watch( paths.assets.css+'/*.css', [useref]);
  gulp.watch( 'resources/assets/css/*.css'  );
  gulp.watch( 'resources/assets/js/*.js'  );

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['resources/assets/**']).on('change', livereload.changed);
  // Watch .css , .js files

});