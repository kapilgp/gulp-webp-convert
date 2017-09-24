# gulp-webp-convert
Convert automatically all jpg, jpeg, png into webp images from multi folders as folders got changed in files.


## Steps 
- Pull Repository
- Add index.js

Add Following Code into index.js

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
    console.log('gulpfile contains webp tasks!');
    gulp.start('webp', function(f){
    	console.log("Task Completed: " + new Date());
    	
    });
}
