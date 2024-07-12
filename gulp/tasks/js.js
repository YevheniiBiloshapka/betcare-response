import webpack from "webpack-stream";

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			entry:{
				// Добавить еще страницы
				index: './src/js/index.js',
				cta: './src/js/cta.js',
				aboutUs: './src/js/aboutUs.js',
				404: './src/js/404.js',

				gsap: './src/js/modules/gsap/gsap.js',
			},
			output: {
				filename: '[name].min.js',
			},
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}