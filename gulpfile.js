const { series, parallel, src, dest } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');
const del = require('del');

function styles() {
    let plugins = [
        autoprefixer(),
        cssnano()
    ];
    return src('cube/css/cube.less')
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('build/css'));
}

function scripts() {
    return src('cube/js/cube.js')
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('build/js'));
}

function modules() {
    return src([
        'node_modules/vue/dist/vue.min.js',
        'node_modules/axios/dist/axios.min.js'
    ])
    .pipe(dest('build/js'));
}

function copy_files() {
    return src([
        'cube/fonts/**/*',
        'cube/images/**/*',
    ], { base: 'cube/'} )
    .pipe(dest('build/'));
}

function copy_root_files() {
    return src([
        '.htaccess',
        'manifest.json',
        'favicon.ico'
    ])
    .pipe(dest('build/'));
}

function html() {
    return src('cube.html')
        .pipe(replace(/.\/node_modules\/vue\/dist\/vue.min.js/g, './js/vue.min.js'))
        .pipe(replace(/.\/node_modules\/axios\/dist\/axios.min.js/g, './js/axios.min.js'))
        .pipe(replace(/.\/cube\/js\/cube.js/g, './js/cube.min.js'))
        .pipe(replace(/.\/cube\/css\/cube.css/g, './css/cube.min.css'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(rename({
            basename: 'index',
            extname: '.html'
        }))
        .pipe(dest('build/'));
}

function clean_dist_before() { return del([ 'build/**/*' ]) }

exports.prebuild = series(clean_dist_before);
exports.create = parallel(styles, scripts, modules, copy_root_files, copy_files, html);
exports.build = series(clean_dist_before, parallel(styles, scripts, modules, copy_root_files, copy_files, html));
