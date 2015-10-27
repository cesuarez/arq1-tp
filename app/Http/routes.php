<?php

Route::get('/', function () {
    return File::get(public_path().'/app.html');
});


// Authentication
Route::get('login', 'AuthController@login');
Route::get('user', 'AuthController@user');
Route::post('auth', 'AuthController@auth');

// /events API
Route::get('events/comments/{id}', 'EventController@comments');
Route::get('events/mostRecent', 'EventController@mostRecent');
Route::get('events/byUser/{id}', 'EventController@byUser');
Route::post('events/comment', 'EventController@addComment');
Route::resource('events', 'EventController');
Route::model('events', 'App\Event');

// Secured Controllers
//Route::group(['middleware' => 'jwt.auth'], function() {
	// Secured Controllers
//});