// Include gulp
var gulp = require('gulp');
var webpConvertor = require('./gulpfile');

// Update Folder Paths

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

webpConvertor.init(tasks);

console.log(gulp.tasks)

if (gulp.tasks.webp) { 
    console.log('gulpfile contains task!');
    gulp.start('webp', function(f){
    	console.log("Task Completed: " + new Date());
    	
    });
}