# Laravel PHP Framework

[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as authentication, routing, sessions, queueing, and caching.

## Official Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

### Amir Composer
Note **: don't composer update
	composer create-project --prefer-dist laravel/laravel amir-project
	
### After Clone
1. Create .env, set Database name
2. php artisan key:generate

cd amir-project

	1.
	** composer require laraveldaily/quickadmin
		insert config/app.php in the $providers: Laraveldaily\Quickadmin\QuickadminServiceProvider::class,
		php artisan quickadmin:install
		insert App/Http/Kernel.php in the $routeMiddleware: 'role' => \Laraveldaily\Quickadmin\Middleware\HasPermissions::class,
	2.
	** composer require bestmomo/filemanager
        //info: https://github.com/bestmomo/filemanager
        insert config/app.php in the $providers: Bestmomo\Filemanager\FilemanagerServiceProvider::class,
        php artisan vendor:publish
        *****Code******
        USER model
			public function accessMediasAll()
			{
			    // return true for access to all medias
			}

			public function accessMediasFolder()
			{
			    // return true for access to one folder
			}
		***********
	3,4.	
	composer require intervention/image
    composer require intervention/imagecache
		php artisan vendor:publish
		insert config/app.php in the $providers: 'Intervention\Image\ImageServiceProvider',
		insert config/app.php in the alias: 'Image'     => 'Intervention\Image\Facades\Image',
		note: the requested PHP extension fileinfo
		*******Code*******
		Route::get('/photo/{size}/{name}', function ($size = null, $name = null) {
			if (!is_null($size) && !is_null($name)) {
				$size        = explode('x', $size);
				$cache_image = Image::cache(function ($image) use ($size, $name) {
				    return $image->make(url('/photos/' . $name))->resize($size[0], $size[1]);
				}, env('CACHE_PHOTO_MINUTE')); // cache for 10 minutes

				return Response::make($cache_image, 200, ['Content-Type' =>'image']);
			} else {
				abort(404);
			}
		});
		// for test <img src="{{ url('/photo/100x100/somephoto.jpg') }}">
		**************
	5.
	composer require felixkiss/uniquewith-validator:2.*
		//info: https://github.com/felixkiss/uniquewith-validator
		insert config/app.php in the $providers: 'Felixkiss\UniqueWithValidator\UniqueWithValidatorServiceProvider',
	6.
    composer require greggilbert/recaptcha:dev-master
        //info: https://github.com/greggilbert/recaptcha
        insert config/app.php in the $providers: Greggilbert\Recaptcha\RecaptchaServiceProvider::class,
        insert config/app.php in the alias     : 'Recaptcha' => Greggilbert\Recaptcha\Facades\Recaptcha::class,
        php artisan vendor:publish --provider="Greggilbert\Recaptcha\RecaptchaServiceProvider"
        /config/recaptcha.php, enter your reCAPTCHA public and private keys.
        resources/lang/[lang]/validation.php: "recaptcha" => 'The :attribute field is not correct.',
	7.
	composer require barryvdh/laravel-debugbar
		insert config/app.php in the $providers: Barryvdh\Debugbar\ServiceProvider::class,
		insert config/app.php in the alias	   : 'Debugbar' => Barryvdh\Debugbar\Facade::class,
		php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"


    for languages
    ****Code****
    Route::get('language/{lang}', function ($lang ='en'){
        session()->put('locale', $lang);
        return back();
    });
	
	\app\Http\Middleware\App.php
	<?php 
		namespace App\Http\Middleware;
		use Closure, Session;
		class App {
		    /**
		     * The availables languages.
		     *
		     * @array $languages
		     */

		    /**
		     * Handle an incoming request.
		     *
		     * @param  \Illuminate\Http\Request  $request
		     * @param  \Closure  $next
		     * @return mixed
		     */
		    public function handle($request, Closure $next)
		    {
		        app()->setLocale(session('locale'));
		        return $next($request);
		    }
		}
		append composer.json in the "autoload": {
        "files": ["app/Helpers/register.php"]
		
		app/Helpers/register.php
		<?php
        	include_once 'TextHelpers.php';

        app/Helpers/TextHelpers.php
        <?php ...
    ********

### Amir Nodejs
		
		... from within our project folder
		$ npm init (Optional)
		$ npm install gulp gulp-useref gulp-if gulp-uglify gulp-cssnano del gulp-livereload gulp-clean gulp-replace gulp-htmlmin --save-dev
		
		* install gulp plugin
		$ npm install gulp -g

		Remove node_modules
		$ npm install rimraf -g $ rimraf node_modules

		* install bower
		Delete bower_components in your root folder
		Create a .bowerrc file in the root
		In the file write this code {"directory" : "resources"}
		Run a bower install
		$ npm install -g bower

### Remove Public from url
		Reaname /server.php to index.php
		Move public/.htaccess to /.htaccess
		Move public/quickadmin to resources
		Find  "url('quickadmin/" where: \vendor Replace "url('resources/quickadmin/"
		php artisan vendor:publish --force
