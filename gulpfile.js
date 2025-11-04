const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

// Paths
const paths = {
  html: 'src/**/*.html',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  images: 'src/images/**/*.{png,jpg,jpeg,gif,svg,webp}',
  dist: 'dist/',
};

// Compile SCSS to CSS and minify
function buildStyles() {
  return src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS()) // Minify CSS
    .pipe(rename('style.css')) // Rename output file to style.css
    .pipe(dest(paths.dist + 'css'));
}

// Minify & copy JS 
function buildScripts() {
  return src(paths.js)
    .pipe(terser()) // Minify JS
    .pipe(dest(paths.dist + 'js')); 
}

// Copy HTML
function copyHtml() {
  return src(paths.html).pipe(dest(paths.dist));
}

// Copy Images 
function copyImages() {
  return src(paths.images, { encoding: false }) // Important for binary files
    .pipe(dest(paths.dist + 'images'));
}

// Watch files
function watchFiles() {
  watch(paths.scss, buildStyles);
  watch(paths.js, buildScripts);
  watch(paths.html, copyHtml);
  watch(paths.images, copyImages);
}


exports.build = series(
  buildStyles,
  buildScripts,
  copyHtml,
  copyImages
);

exports.default = series(
  buildStyles,
  buildScripts,
  copyHtml,
  copyImages,
  watchFiles
);