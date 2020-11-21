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

function styles() {
    let plugins = [
        autoprefixer(),
        cssnano()
    ];
    return src('cube/css/cube.less')
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('tmp/css'));
}

function scripts() {
    return src('cube/js/cube.js')
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('tmp/js'));
}

function html() {
    return src('cube.html')
        .pipe(replace(/.\/node_modules\/vue\/dist\/vue.min.js/g, './js/vue.min.js'))
        .pipe(replace(/.\/cube\/css\/cube.css/g, './css/cube.min.css'))
        .pipe(replace(/.\/cube\/js\/cube.css/g, './js/cube.min.js'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(rename({
            basename: 'app',
            extname: '.html'
        }))
        // .pipe(dest('./'));
        .pipe(dest('tmp/'));
}

function modules() {
    return src([
        'node_modules/vue/dist/vue.min.js'
    ])
    .pipe(dest('tmp/js'));
}


exports.create = parallel(styles, scripts, modules, html);
