<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/info', function () {
    return view('welcome');
});

// for languages
Route::get('language/{locale}', function ($locale ='en'){
    session()->put('locale', $locale);
    return back();
});

// for size image manegment
Route::get('/photo/{size}/{service}/{name}', function ( $size, $service, $name ){
	return imageResizeCache(config('app.admin').'/public/uploads/',$size, $service, $name);
});

Route::get('/fix/{size}/{service}/{name}', function ( $size, $service, $name ){
	return imageResizeCache('/resources/vendor/',$size, $service, $name);
});

function imageResizeCache ($path = null, $size = null, $service = null, $name = null) {
	if (!is_null($path) && !is_null($size) && !is_null($service) && !is_null($name)) {
		
		$size        = explode('x', $size);
		$cache_image = Image::cache(function ($image) use ($path, $size, $service, $name) {
			if ( 'null' == $size[0] || 'null' == $size[1]) {
		    	return $image->make(url( $path . $service .'/'. $name))
		    		     	->resize($size[0], $size[1], function ($constraint) {
														    $constraint->aspectRatio();
														});
			} else {
				return $image->make(url( $path . $service .'/'. $name))
		    		     	->resize($size[0], $size[1]);
			}
			
		}, env('CACHE_PHOTO_MINUTE',10)); // default cache for 10 minutes

		return Response::make($cache_image, 200, ['Content-Type' =>'image']);
	} else {
		abort(404);
	}
}
