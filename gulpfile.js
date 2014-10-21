/*
	Importing modules
*/
var gulp 		= require('gulp'),
	concat 		= require('gulp-concat')
	uglify		= require('gulp-uglify'),
	jsHint		= require('gulp-jshint'),
	sass		= require('gulp-sass'),
	plumber 	= require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload,
	scssPath 	= {'from':'src/scss/**/*.scss','to':'public/css'},
	jsPath 		= {'from':'src/js/**/*.js','to':'public/js'},
	phpPath 	= {'from':'src/**/*.php','to':'public'};

//Scripts task
gulp.task('scripts',function()
{
	gulp.src( jsPath.from )
		.pipe( plumber({errorHandler: displayError}) )
		.pipe( concat('main.js') )
		.pipe( uglify() )
		.pipe( gulp.dest( jsPath.to ) )
		.pipe(reload({stream:true}));

});

// styles task
gulp.task('styles',function()
{
	gulp.src( scssPath.from )
		.pipe( plumber({errorHandler: displayError}) )
		.pipe( sass())
		.pipe(gulp.dest( scssPath.to ))
		.pipe(reload({stream:true}));
});


gulp.task('php-files',function()
{
	gulp.src( phpPath.from )
		.pipe( gulp.dest( phpPath.to ) )
		.pipe( reload({stream:true}) );
});

gulp.task('browser-sync', function() {
    browserSync({
    	open: true,
        proxy: "localhost"
    });
});

gulp.task('bs-reload', function () {
    reload();
});
// Watch JS Files saved
gulp.task('watch', function()
{
	gulp.watch( jsPath.from ,['scripts']);// what to watch [task to run ]
	gulp.watch( scssPath.from ,['styles']);
	gulp.watch( phpPath.from ,['php-files']);
});



gulp.task('default',['scripts','styles','php-files','browser-sync','watch']);



var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}