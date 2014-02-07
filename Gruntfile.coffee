module.exports = ( grunt ) ->

	###
	This would take a src object of the form:
	{
		something:
			totally: "else"
		and: "this"
	}
	And extend the dest object with the following:
	{
		something_totally: "else"
		and: "this"
	}
	###
	flatExtend = ( dest, src, keyPath ) ->
		if typeof src is 'object'
			for key, value of src
				flatExtend( dest, value, ( keyPath and "#{ keyPath }_" or '' ) + key )
		else
			dest[ keyPath ] = src

		dest

	packageJson = grunt.file.readJSON 'package.json'

	prepHtmlTarget =
		expand: yes
		src   : '<%= pkg.htmlTarget %>'
		dest  : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/'

	prepCoffee =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.coffeeDir %>/**/*.coffee', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.coffeeDir %>/'

	prepJs =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.jsDir %>/**/*.js', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.jsDir %>/'

	prepCss =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.cssDir %>/**/*.css', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.cssDir %>/'

	prepFont =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.fontDir %>/**/*', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.fontDir %>/'

	prepImg =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.imgDir %>/**/*', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.imgDir %>/'

	prepDirectiveTemplates =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.templateDir %>/<%= pkg.directiveDir %>/*.html', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.templateDir %>/<%= pkg.directiveDir %>/'

	prepViewTemplates =
		expand : yes
		flatten: yes
		src    : [ '**/<%= pkg.templateDir %>/<%= pkg.viewDir %>/*.html', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.templateDir %>/<%= pkg.viewDir %>/'

	prepScss =
		expand : yes
		src    : [ '**/<%= pkg.scssDir %>/**/*.scss', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>'

	buildCoffeeHead = 
		expand : yes
		flatten: yes
		src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.coffeeDir %>/*.<%= pkg.headSuffix %>.coffee'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/'
		ext    : '.<%= pkg.headSuffix %>.js'

	buildCoffeeTail = 
		expand : yes
		flatten: yes
		src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.coffeeDir %>/*.<%= pkg.tailSuffix %>.coffee'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/'
		ext    : '.<%= pkg.tailSuffix %>.js'

	buildJs =
		expand : yes
		flatten: yes
		src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.jsDir %>/*.js'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/'

	buildCss =
		expand : yes
		flatten: yes
		src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.cssDir %>/*.css'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>/'

	buildFont =
		expand : yes
		flatten: yes
		src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.fontDir %>/*'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.fontDir %>/'

	buildImg =
		expand : yes
		flatten: yes
		src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.imgDir %>/*'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.imgDir %>/'

	buildTemplates =
		expand : yes
		cwd    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.templateDir %>/'
		src    : '**/*.html'
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.templateDir %>/'

	buildScss =
		expand : yes
		flatten: yes
		src    : [ '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/**/*.scss', '!**/_*.scss', '!**/*.<%= pkg.headSuffix %>.scss', '!**/*.body.scss' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>/'
		ext    : '.css'

	buildScssHead =
		expand : yes
		flatten: yes
		src    : [ '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/**/*.<%= pkg.headSuffix %>.scss', '!**/_*.scss' ]
		dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>/'
		ext    : '.<%= pkg.headSuffix %>.css'

	builtTemplatesJs = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/9991_templates.<%= pkg.tailSuffix %>.js'

	builtJsHead = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/*.<%= pkg.headSuffix %>.js'
	builtJsTail = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/*.<%= pkg.tailSuffix %>.js'

	uglyJsHead = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/<%= pkg.headSuffix %>.js'
	uglyJsTail = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/<%= pkg.tailSuffix %>.js'

	prettyJsHead = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/pretty_head.js'
	prettyJsTail = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/pretty_tail.js'

	allPrettyJs = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/pretty_all.js'
	allJs       = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>/all.js'

	builtCssHead = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>/*.<%= pkg.headSuffix %>.css'

	miniCssHead = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>/<%= pkg.headSuffix %>.css'

	allCss = '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>/all.css'

	preprocessContext = flatExtend {}, packageJson
	preprocessContext = flatExtend preprocessContext, packageJson.applicationConfig[ packageJson.environment ], 'applicationConfig'

	gruntConfig =
		pkg: packageJson

		clean: 
			all   : [ '<%= pkg.buildDir %>/' ]
			coffee: [ '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.coffeeDir %>', '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.jsDir %>', '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.jsDir %>'  ]
			scss  : [ '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>'  , '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.cssDir %>' ]

		preprocess:
			options      : context: preprocessContext
			htmlTarget   : files: [ prepHtmlTarget ]
			prepCoffee   : files: [ prepCoffee ]
			prepScss     : files: [ prepScss ]
			prepJs       : files: [ prepJs ]
			prepCss      : files: [ prepCss ]
			prepTemplates: files: [ prepDirectiveTemplates, prepViewTemplates ]

		modernizr:
			outputFile: '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.jsDir %>/modernizr.<%= pkg.headSuffix %>.js'
			uglify    : yes
			parseFiles: no
			extra     :
				shiv      : yes
				printshiv : no
				load      : no
				mq        : no
				cssclasses: yes
			extensibility:
				addtest     : no
				prefixed    : no
				teststyles  : yes
				testprops   : yes
				testallprops: yes
				hasevents   : no
				prefixes    : yes
				domprefixes : yes
			tests: [
				"backgroundsize"
				"flexbox"
				"rgba"
				"cssanimations"
				"cssgradients"
				"csstransitions"
				"input"
				"inputtypes"
				"css_backgroundsizecover"
				"css_boxsizing"
			]

		copy: 
			prepFont      : files: [ prepFont ]
			prepImg       : files: [ prepImg ]
			buildJs       : files: [ buildJs ]
			buildCss      : files: [ buildCss ]
			buildFont     : files: [ buildFont ]
			buildImg      : files: [ buildImg ]
			buildTemplates: files: [ buildTemplates ]

		coffee:
			head: buildCoffeeHead
			tail: buildCoffeeTail

		ngtemplates:
			ngApp:
				cwd    : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/<%= pkg.templateDir %>'
				src    : '**/*.html'
				dest   : builtTemplatesJs

				options:
					module: packageJson.ngApp
					url: ( url ) ->
						grunt.config.process "#{
							packageJson.applicationConfig[ packageJson.environment ].defaultScheme
						}#{
							packageJson.applicationConfig[ packageJson.environment ].staticFileDomain
						}/#{
							packageJson.applicationConfig[ packageJson.environment ].staticFileDirectory
						}/#{
							packageJson.templateDir
						}/#{
							url
						}#{
							packageJson.applicationConfig[ packageJson.environment ].staticFileSuffix
						}"
					htmlmin:
						collapseBooleanAttributes: no
						collapseWhitespace       : yes
						removeAttributeQuotes    : yes
						removeComments           : yes
						removeEmptyAttributes    : yes
						removeRedundantAttributes: yes

		sass:
			options:
				compass : yes
				loadPath: [
					'<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/**/<%= pkg.scssDir %>'
					'<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/angoolar-bootstrap/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/channel_id/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/channel_id_channel_programmer/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/channel_id_postroll/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/channel_id_comment_moderator/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/channel_id_single_video_uploader/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/video/<%= pkg.scssDir %>'
					# '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.scssDir %>/<%= pkg.srcDir %>/ui/<%= pkg.scssDir %>'
				]
				style   : 'condensed'
				require : 'animation'
			dist: files: [ buildScssHead, buildScss ]

		concat:
			prettyHead:
				options: separator: ';'
				src    : builtJsHead
				dest   : prettyJsHead
			prettyTail:
				options: separator: ';'
				src    : builtJsTail
				dest   : prettyJsTail
			allPrettyJs:
				options: separator: ';'
				src    : [ prettyJsHead, prettyJsTail ]
				dest   : allPrettyJs
			allCss:
				src: [ builtCssHead ]
				dest: allCss

		uglify:
			options:
				report: packageJson.report
			headJs:
				src : builtJsHead
				dest: uglyJsHead
			tailJs:
				src : builtJsTail
				dest: uglyJsTail
			allJs:
				src: [ builtJsHead, builtJsTail ]
				dest: allJs

		cssmin:
			options:
				report: packageJson.report
			headCss:
				src : builtCssHead
				dest: miniCssHead
			allCss:
				src: [ builtCssHead ]
				dest: allCss

		htmlbuild:
			development:
				src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.htmlTarget %>'
				dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/'
				options:
					scripts :
						head: [ builtJsHead ]
						tail: [ builtJsTail ]
					styles:
						head: [ builtCssHead ]

			production:
				src    : '<%= pkg.buildDir %>/<%= pkg.almostBuiltDir %>/<%= pkg.htmlTarget %>'
				dest   : '<%= pkg.buildDir %>/<%= pkg.builtDir %>/'
				options:
					scripts :
						head: [ uglyJsHead ]
						tail: [ uglyJsTail ]
					styles:
						head: [ miniCssHead ]

		watch:
			options:
				livereload: yes # packageJson.liveReloadPort
				verbose   : yes
			gruntfile:
				files: [ 'Gruntfile.coffee', 'package.json' ]
				tasks: [ '<%= pkg.environment %>' ]
			scss:
				files: [ '**/<%= pkg.scssDir %>/**/*.scss', '**/<%= pkg.cssDir %>/**/*.css', '!<%= pkg.buildDir %>/**/*' ]
				tasks: [ 'scss_<%= pkg.applicationConfig[ pkg.environment ].type %>' ]
			coffee:
				files: [ '**/<%= pkg.coffeeDir %>/**/*.coffee', '**/<%= pkg.templateDir %>/**/*.html', '!<%= pkg.buildDir %>/**/*' ]
				tasks: [ 'coffee_<%= pkg.applicationConfig[ pkg.environment ].type %>' ]
			statics:
				files: [ '**/<%= pkg.jsDir %>/**/*.js', '**/<%= pkg.cssDir %>/**/*.css', '**/<%= pkg.fontDir %>/**/*', '**/<%= pkg.imgDir %>/**/*', '!node_modules/**/*', '!<%= pkg.buildDir %>/**/*' ]
				tasks: [ 'copy', 'ngtemplates', 'concat', 'htmlbuild:<%= pkg.applicationConfig[ pkg.environment ].type %>' ]
			htmlTarget:
				files: [ '<%= pkg.htmlTarget %>' ]
				tasks: [ 'preprocess', 'htmlbuild:<%= pkg.applicationConfig[ pkg.environment ].type %>' ]

		bump:
			options:
				files             : [ 'package.json' ]
				updateConfigs     : []
				commit            : yes
				commitMessage     : '<%= pkg.name %> Front End Release uiv%VERSION%'
				commitFiles       : [ '-a' ] # '-a' for all files
				createTag         : yes
				tagName           : 'uiv%VERSION%'
				tagMessage        : '<%= pkg.name %> Front End Version %VERSION%'
				push              : yes
				pushTo            : 'origin'
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' # options to use with '$ git describe'

	grunt.initConfig gruntConfig

	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-html-build'
	grunt.loadNpmTasks 'grunt-bump'
	grunt.loadNpmTasks 'grunt-preprocess'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-cssmin'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-angular-templates'
	grunt.loadNpmTasks 'grunt-modernizr'

	tasksByType = 
		development: [ 
			'clean:all'
			'preprocess'
			'modernizr'
			'copy'
			'coffee'
			'ngtemplates'
			# 'uglify'
			'sass'
			'concat'
			# 'cssmin'
			'preprocess:htmlTarget'
			'htmlbuild:development'
		]
		production: [ 
			'clean:all'
			'preprocess'
			'modernizr'
			'copy'
			'coffee'
			'ngtemplates'
			'uglify'
			'sass'
			'concat'
			'cssmin'
			'preprocess:htmlTarget'
			'htmlbuild:production'
		]

	grunt.registerTask environment, tasksByType[ applicationConfig.type ] for environment, applicationConfig of packageJson.applicationConfig

	grunt.registerTask 'default', tasksByType[ packageJson.applicationConfig[ packageJson.environment ].type ]

	watchTasks =
		scss_development: [ 'clean:scss', 'preprocess:prepScss', 'preprocess:prepCss', 'copy:buildCss', 'sass', 'concat:allCss',           'htmlbuild:development' ]
		scss_production : [ 'clean:scss', 'preprocess:prepScss', 'preprocess:prepCss', 'copy:buildCss', 'sass', 'concat:allCss', 'cssmin', 'htmlbuild:production'  ]

		coffee_development: [ 'clean:coffee', 'preprocess:prepCoffee', 'preprocess:prepJs', 'preprocess:prepTemplates', 'copy:buildJs', 'copy:buildTemplates', 'coffee', 'ngtemplates', 'concat:prettyHead', 'concat:prettyTail', 'concat:allPrettyJs',           'htmlbuild:development' ]
		coffee_production : [ 'clean:coffee', 'preprocess:prepCoffee', 'preprocess:prepJs', 'preprocess:prepTemplates', 'copy:buildJs', 'copy:buildTemplates', 'coffee', 'ngtemplates', 'concat:prettyHead', 'concat:prettyTail', 'concat:allPrettyJs', 'uglify', 'htmlbuild:production'  ]

	grunt.registerTask watchTasksName, tasks for watchTasksName, tasks of watchTasks

	grunt.log.writeln "Build environment: #{ packageJson.environment }, Build type: #{ packageJson.applicationConfig[ packageJson.environment ].type }"
