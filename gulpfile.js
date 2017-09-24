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

//Main Login HERE
var webpConvertor = {

	_initialTasks: [],
	_ext: '{png,jpeg,jpg,PNG,JPG,JPEG}',

	init: function(tasks) {
		//Create Tasks
		var self = this;

		for (var task in tasks) {

		    self._initialTasks.push(task);

		    gulp.task(task, function(){
		        //console.log('this.currentStartTaskName: ' + this.currentStartTaskName);
		        //console.log('this.currentRunTaskName: ' + this.currentRunTaskName);
		        return self._converter(tasks[this.currentRunTaskName].path);
		    });
		}

		//Watch Tasks
		gulp.task('webp', self._initialTasks, function() { 

		    for (var task in tasks) {
		        //console.log(task, tasks[task].watchPath, tasks[task].path);
		        gulp.watch(tasks[task].watchPath + '/**/*.' + self._ext, [task])
		            .on('error', self._onERR);
		    }
		});
	},

	_converter: function (path) {
		var self = this;
	    //console.log(path + '/**/*.' + ext);
	    return gulp.src([path + '/**/*.' + self._ext])
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
	},

	_onERR: function(error) {
		// silently catch 'ENOENT' error typically caused by renaming watched folders
	    if (error.code === 'ENOENT') {
	        console.log(error)
	        return;
	    }
	}
}

module.exports = webpConvertor;