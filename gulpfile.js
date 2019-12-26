const { series, parallel, src, dest, watch } = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

const paths = {
    html: {
        src: './src/html/',
        build: './build/html/',
        watch: './src/html/**/*.html'
    }
}

function server(cb) {
    connect.server({
        port: 1611,
        root: './build',
        livereload: true
    });
    cb();
}

function css(cb) {
    src('./src/css/scss/**/*.scss')
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(dest('./build/css/'))
        .pipe(connect.reload())
    cb();
}

function html(cb) {
    src('./src/*.html')
        .pipe(dest('./build/'))
        .pipe(connect.reload());
    cb();
}

function icons(cb) {
    src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(dest('./build/webfonts/'));
    cb();
};

function watcher() {
    watch(['./src/css/**/*.scss'], series(css));
    watch(['./src/*.html'], series(html));
}

// exports.build = parallel(server, parallel(html, css), watcher);
exports.build = parallel(server, html, icons, watcher);
