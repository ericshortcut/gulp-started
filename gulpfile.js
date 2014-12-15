/********************************************************************************
								Importing modules
********************************************************************************/
var gulp 		= require('gulp'),
	concat 		= require('gulp-concat')
	uglify		= require('gulp-uglify'),
	jsValidate	= require('gulp-jsvalidate'),
	sass		= require('gulp-sass'),
	plumber 	= require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload,

/********************************************************************************
								Paths
********************************************************************************/
	scssPath 	= {'from':'src/scss/**/*.scss','to':'public/css'},
	jsPath 		= {'from':'src/js/**/*.js','to':'public/js'},
	phpPath 	= {'from':'src/**/*.php','to':'public'};

/********************************************************************************
								Task's list
********************************************************************************/

// Scripts task
gulp.task('jsScripts',function()
{
	gulp.src ( jsPath.from ) 
		.pipe( plumber({errorHandler: displayError}) )
    	.pipe( jsValidate() )
		.pipe( concat('main.js') )
		.pipe( uglify() )
		.pipe( gulp.dest( jsPath.to ) )
		.pipe( reload({stream:true}) );

});

// Scss task
gulp.task('scss',function()
{
	gulp.src ( scssPath.from )
		.pipe( plumber({errorHandler: displayError}) )
		.pipe( concat('style.css') )
		.pipe( sass())
		.pipe( gulp.dest( scssPath.to ) )
		.pipe( reload({stream:true}) );
});

// Php task
gulp.task('phpFiles',function()
{
	gulp.src ( phpPath.from )
		.pipe( gulp.dest( phpPath.to ) )
		.pipe( reload({stream:true}) );
});

// BrowserSync task
gulp.task('browser-sync', function()
{
    browserSync({
    		port:8888,
        proxy: "localhost"
    });
});

// Watching files and triggering tasks
gulp.task('watch', function()
{
	gulp.watch( jsPath.from ,['jsScripts'] );
	gulp.watch( scssPath.from ,['scss'] );
	gulp.watch( phpPath.from ,['phpFiles'] );
});


// Default task's list
gulp.task('default',['jsScripts','scss','phpFiles','browser-sync','watch']);


//Custom error display for plumber
var displayError = function(error) 
{

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    	errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
        errorString += ' in ' + error.fileName || "";
        errorString += ' on line ' + error.lineNumber || "";

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
}