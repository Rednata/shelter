import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpCssimport from 'gulp-cssimport';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import del from 'del';
import sourcemap from 'gulp-sourcemaps';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulpif from 'gulp-if';
import terser from 'gulp-terser';


const prepros = true;
let dev = false;

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
      .pipe(sourcemap.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemap.write('../maps'))
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

// export const js = () => gulp
//   .src('src/script/**/*.js')
//   .pipe(gulp.dest('dist/script'))
//   .pipe(browserSync.stream());

const webpackConf = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-source-map' : false,
  optimization: {
    minimize: false,
  },
  entry: {
    index: './src/script/index.js',    
    pets: './src/script/pets.js',    

  },
  output: {
    filename: '[name].js',
    sourceMapFilename: "[name].js.map",
  },
  module: {
    rules: [],
  },
};

if (!dev) {
  webpackConf.module.rules.push({
    test: /\.(js)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
  });
}

export const js1 = () =>
  gulp
    .src('src/script/index.js')
    // .pipe(plumber())
    .pipe(webpackStream(webpackConf, webpack))
    .pipe(gulpif(!dev, gulp.dest('dist/script')))    
    .pipe(gulpif(!dev, terser()))
    .pipe(gulp.dest('dist/script'))
    .pipe(browserSync.stream());

export const js2 = () =>
  gulp
    .src('src/script/pets.js')
    // .pipe(plumber())
    .pipe(webpackStream(webpackConf, webpack))
    .pipe(gulpif(!dev, gulp.dest('dist/script')))    
    .pipe(gulpif(!dev, terser()))
    .pipe(gulp.dest('dist/script'))
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
    gulp.watch('./src/script/index.js', js1);
    gulp.watch('./src/script/pets.js', js2);
    gulp.watch(['./src/img/**/*', './src/fonts/**/*'], copy);
  };

  export const clear = () => del('dist/**/*', {forse: true,});

  const develop = (ready) => {
    dev = true;
    ready();
  };

  //  запуск
  export const base = gulp.parallel(html, style, js1, js2, copy);

  export const build = gulp.series(clear, base);

  export default gulp.series(develop, base, server);
    

  
