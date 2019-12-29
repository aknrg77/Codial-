const gulp = require('gulp');

// converts sass to css
const sass = require('gulp-sass');

//converts css file code into 1 line
const cssnano = require('gulp-cssnano');

//attaches random name to the file name
const rev = require('gulp-rev');

//compresses js files
const uglify = require('gulp-uglify-es').default;

//comresses images 
const imagemin = require('gulp-imagemin');

//Since we're generating files automatically, we'll want to make sure that files that are no longer used don't remain anywhere without us knowing.
const del = require('del');



gulp.task('css',function(done){
    console.log('minifying css ...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets/css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});



gulp.task('js',function(done){
    console.log('minifying js ...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
 });



 gulp.task('images',function(done){
    console.log('minifying images ...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
 });


 //empty the public/assests directory
gulp.task('clean:assets',function(done){
    del.sync('./public/assets');
    done();
})

// run it according to the series 
gulp.task('build',gulp.series('clean:assets' , 'css' , 'js' , 'images'),function(done){

    console.log('Building assets');
    done();
});


