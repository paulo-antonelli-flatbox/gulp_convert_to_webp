const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require('del');
const rename = require("gulp-rename");

const conditionalDeleteDir = require('./enviorment').deleteDir;
const srcEnviorment = require('./enviorment').src;
const distEnviorment = require('./enviorment').dist;

let src = `${srcEnviorment}/**/*.*`;
let dest = `${distEnviorment}/`;

gulp.task("build", function () {
    (async () => {
        if (conditionalDeleteDir === true) {
            const deletedPaths = await del([`./${distEnviorment}`]);
            console.log(`Limpando diretorio ~~> ${deletedPaths.join('\n')}`);
            console.log(`Otimizando imagens aguarde...`);
            return;
        } else {
            console.log(`Otimizando imagens aguarde...`);
            return;
        }
    })()
    return gulp.src(src)
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: false }),
                imagemin.optipng({ optimizationLevel: 3 }),
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]))
        .pipe(rename(function (path) {
            path.basename += path.extname;
            console.log(`Otimizando imagem: ${path.basename}`);
        }))
        .pipe(webp())
        .pipe(gulp.dest(dest))
});