const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss'
}

// funcion que compila SASS
function css(){
    return src(paths.scss)
    .pipe( sass({
        outputStyle: 'expanded'  //expanded permite obtener una mejor estructura en el archivo css tras compilar
    }) )
    .pipe( dest('./build/css'))
}

// funcion para comprimir las imagenes
function imagenes(){
    return src(paths.imagenes)
    .pipe( imagemin() )
    .pipe( dest( './build/img' ))
    .pipe( notify({ message: 'Imagen Minificada'}));
}

// cambiar las imagenes a tipo webp
function versionWebp(){
    return src(paths.imagenes)
    .pipe( webp() )
    .pipe( dest( './build/img' ))
    .pipe( notify({ message: 'Version Webp lista'}));
}

function mimificarCss(){
    return src(paths.scss)
    .pipe( sass({
        outputStyle: 'compressed'  //comprimir el archivo css para produccion
    }) )
    .pipe( dest('./build/css'))
}

// leer todos los archivos de sass
function watchArchivos(){
    watch( paths.scss , css);  //* = la carpeta actual - ** todos los archivos con esa extension
}

exports.css = css;
exports.imagenes = imagenes;
exports.mimificarCss = mimificarCss;
exports.watchArchivos = watchArchivos;

exports.default = series( css, imagenes, versionWebp, watchArchivos );
