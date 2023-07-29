const isdev = require("isdev");

const gulp = require("gulp");
const gulpif = require("gulp-if");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const replace = require("gulp-replace");

const message = require("../../lib/message");

const path = require("path");
const dotenv = require("dotenv");

const envFilePath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envFilePath });

module.exports = function () {
  return gulp
    .src("../assets/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-flow", "@babel/preset-env"],
      })
    )
    .on("error", message.error("JavaScript: Building"))
    .pipe(replace("API_KEY", JSON.stringify(process.env.CHATGPT_API_KEY)))
    .pipe(gulpif(!isdev, uglify()))
    .on("error", message.error("JavaScript: Minification"))
    .pipe(gulp.dest("../public/js"));
};