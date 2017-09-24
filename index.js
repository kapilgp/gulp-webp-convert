// Include gulp
var gulp = require('gulp');
var webpConvertor = require('./gulpfile');

// Update Folder Paths Here according to requirement

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

//console.log(gulp.tasks)

if (gulp.tasks.webp) { 
    console.log('gulpfile contains webp task!');
    gulp.start('webp', function(f){
    	console.log("Task Completed: " + new Date());
    	
    });
}