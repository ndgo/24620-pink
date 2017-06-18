"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var rimraf = require('rimraf'); //очистка
var imagemin = require('gulp-imagemin'); //минимизация изображений
var sourcemaps = require('gulp-sourcemaps'); //sourcemaps
var uglify = require('gulp-uglify'); //минификация js
var rename = require("gulp-rename"); //переименвоание файлов
var cssmin = require('gulp-minify-css'); //минификация css
var runSequence = require('run-sequence');

var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    contentImg: 'build/img/'
  },
  src: { //Пути откуда брать исходники
    html: './*.html', //Синтаксис src/template/*.html говорит gulp что мы хотим взять все файлы с расширением .html
    js: './js/*.js',//В стилях и скриптах нам понадобятся только main файлы
    css: './sass/style.scss',
    img: './img/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    fonts: './fonts/*.*',
    contentImg: './img/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: './*.html',
    js: './js/**/*.js',
    css: './css/**/*.*',
    img: './img/**/*.*',
    contentImg: './img/**/*.*',
    fonts: './fonts/**/*.*'
  },
  clean: './build', //директории которые могут очищаться
  outputDir: './build' //исходная корневая директория для запуска минисервера
};

gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions"
        ]
      })
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

// чистим папку билда
gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

// билдим статичные изображения
gulp.task('image:build', function () {
  gulp.src(path.src.img) //Выберем наши картинки
    .pipe(imagemin({ //Сожмем их
      progressive: true, //сжатие .jpg
      svgoPlugins: [{removeViewBox: false}], //сжатие .svg
      interlaced: true, //сжатие .gif
      optimizationLevel: 3 //степень сжатия от 0 до 7
    }))
    .pipe(gulp.dest(path.build.img)) //выгрузим в build
});

// таск для билдинга html
gulp.task('html:build', function () {
  gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(gulp.dest(path.build.html)) //выгрузим их в папку build
});

// билдинг яваскрипта
gulp.task('js:build', function () {
  gulp.src(path.src.js) //Найдем наш main файл
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(uglify()) //Сожмем наш js
    .pipe(sourcemaps.write()) //Пропишем карты
    // .pipe(rename({suffix: '.min'})) //добавим суффикс .min к выходному файлу
    .pipe(gulp.dest(path.build.js)) //выгрузим готовый файл в build
});

// билдинг домашнего css
gulp.task('css:build', function () {
  gulp.src(path.src.css) //Выберем наш основной файл стилей
    .pipe(sourcemaps.init()) //инициализируем soucemap
    .pipe(sass()) //Скомпилируем stylus
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions"
        ]
      })
    ])) //Добавим вендорные префиксы
    .pipe(cssmin()) //Сожмем
    .pipe(sourcemaps.write()) //пропишем sourcemap
    // .pipe(rename({suffix: '.min'})) //добавим суффикс .min к имени выходного файла
    .pipe(gulp.dest(path.build.css)) //вызгрузим в build
});

// билдим шрифты
gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts)) //выгружаем в build
});

// билдим все
gulp.task('build', function (callback) {
  runSequence('clean', ['image:build', 'html:build', 'js:build', 'css:build', 'fonts:build'], callback);
});
