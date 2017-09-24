/**
 * WEBP convert for Multi folders with watch
 * @created  September 24, 2017
 * @author Kapil Gupta <kapil.gp@gmail.com>
 * @license https://raw.githubusercontent.com/kapilgp/gulp-webp-convert/master/LICENSE
 */


// Include gulp
var gulp = require('gulp');
var webp = require('gulp-webp');
var logger = require('gulp-logger');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');

//Patch for getting current running task inside task
var _gulpStart = gulp.Gulp.prototype.start;
var _runTask = gulp.Gulp.prototype._runTask;

gulp.Gulp.prototype.start = function (taskName) {
    this.currentStartTaskName = taskName;

    _gulpStart.apply(this, arguments);
};

gulp.Gulp.prototype._runTask = function (task) {
    this.currentRunTaskName = task.name;

    _runTask.apply(this, arguments);
};


var initialTasks = [];
var ext = '{png,jpeg,jpg,PNG,JPG,JPEG}'; 
var tasks = {
    'webp-dest1': {
        path: './dest/dest1',
        watchPath: 'dest/dest1'
    },
    'webp-dest2': {
        path: './dest/dest2',
        watchPath: 'dest/dest2'
    }
};

//WEBP Convertor
var converter = function (path) {
    //console.log(path + '/**/*.' + ext);
    return gulp.src([path + '/**/*.' + ext])
        .pipe(changed(path, {extension: '.webp'}))
        .pipe(plumber())
        .pipe(logger({
            before: path + ': Started WEBP Conversion...',
            after: path + ': WEBP Conversion complete!',
            extname: '.webp',
            showChange: true
        }))
        .pipe(webp())
        .pipe(gulp.dest(path));
}


//Create Tasks
for (var task in tasks) {

    initialTasks.push(task);

    gulp.task(task, function(){
        //console.log('this.currentStartTaskName: ' + this.currentStartTaskName);
        //console.log('this.currentRunTaskName: ' + this.currentRunTaskName);
        return converter(tasks[this.currentRunTaskName].path);
    });

}


gulp.task('webp', initialTasks, function() { 

    for (var task in tasks) {
        //console.log(task, tasks[task].watchPath, tasks[task].path);
        gulp.watch(tasks[task].watchPath + '/**/*.' + ext, [task])
            .on('error', onErr);
    }
});

var onErr = function(error) {
    // silently catch 'ENOENT' error typically caused by renaming watched folders
    if (error.code === 'ENOENT') {
        console.log(error)
        return;
    }
}