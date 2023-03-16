import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssimport from 'gulp-cssimport';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import del from 'del';

const prepros = true;

// задачи

const sass = gulpSass(sassPkg);

export const html = () => gulp
  .src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/style'))
      .pipe(browserSync.stream());
  } 
  return gulp
    // .src('src/css/**/*.css')   если несколько css-Файлов
    .src('src/css/index.css')  // если все мпортируется в один Css-файл
    .pipe(gulpCssimport({
      extentions: ['css']
    }))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
}

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    'src/img/**/*',
    'src/icons/**/*'
  ], {
    base: 'src'
  })  
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream({
    once: true
  }));

export const js = () => gulp
  .src('src/js/**/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

  export const server = () => {
    browserSync.init({
      ui: false,
      notify: false,
      // tunnel: true,
      server: {
        baseDir: 'dist'
      }
    })
    gulp.watch('./src/**/*.html', html);
    gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
    gulp.watch('./src/js/**/*.js', js);
    gulp.watch(['./src/img/**/*', './src/fonts/**/*'], copy);
  };

  export const clear = () => del('dist/**/*', {forse: true,});

  //  запуск
  export const base = gulp.parallel(html, style, js, copy);

  export const build = gulp.series(clear, base);

  export default gulp.series(base, server);
    

  
