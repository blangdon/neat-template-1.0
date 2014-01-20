module.exports = function(grunt) {
	// we can initialize our configuration object
	grunt.initConfig({
		// read in the project settings from the package.json file into the pkg property. 
		// this allows us to refer to the values of properties within our package.json file
		pkg: grunt.file.readJSON('package.json'),
		// Compile SCSS
		sass: {
			dist: {
				files: {
					'css/main.css' : 'scss/main.scss'
				},
				options:{
					style: 'compressed'
				}
			}
		},
		// Uglify
		uglify: {
			options: {
		    	mangle: false,
		    	beautify: false
		    },
	    	my_target: {
	      		files: {
        			'js/scripts.min.js': ['js/src/*.js']
      			}
	    	}
  		},
  		// SVG minify
  		svgmin: {	// Task
	        options: {	// Configuration that will be passed directly to SVGO
	            plugins: [{
	            	mergePaths: false, 
	            	removeViewBox: false
	            }]
	        },
	        dist: {	// Target
	            files: [{
	                expand: true,				// Enable dynamic expansion.
	                cwd: 'img/icon/svg/src',	// Src matches are relative to this path.
	                src: ['*.svg'],				// Actual pattern(s) to match.
	                dest: 'img/icon/svg',		// Destination path prefix.
	                ext: '-min.svg'				// Dest filepaths will have this extension.
	            }]
	        }
	    },
	    // Grunticon
	    grunticon: {
		    myIcons: {
		            files: [{
		                expand: true,
		                cwd: 'img/icon/svg',
		                src: ['*.svg', '*.png'],
		                dest: "img/icon/svg/fallback"
		            }],
		          options: {
		      }
		    }
		},
        // Watch
		watch: {
			options:{
				livereload: true
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			js: {
				files: 'js/src/*.js',
				tasks: ['uglify']
			}
		}
	});

	// Once you have your tasks set up you need to load these
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Once you have your tasks set up you need to load these
	// the 'default' task is what gets run when you type grunt in the commandline, 
	// as you can see you also set an array of tasks you want to run when this is done, ['sass','jshint','uglify'].
	grunt.registerTask('default',['watch']);
	grunt.registerTask('svg',['svgmin', 'grunticon']);
}