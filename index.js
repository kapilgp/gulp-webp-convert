// Include gulp
var gulp = require('gulp');
var webpConvertor = require('./gulpfile');
var tasks = require('./tasks');

webpConvertor.init(tasks);

//console.log(gulp.tasks)

if (gulp.tasks.webp) { 
    console.log('gulpfile contains webp tasks!');
    gulp.start('webp', function(){
    	console.log("All Tasks Completed: " + new Date());
    });
}