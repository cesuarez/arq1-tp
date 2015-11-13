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
Route::post('events/comment', 'EventController@addComment');
Route::get('events/weather/{id}', 'EventController@weather');

Route::group(['middleware' => 'jwt.auth'], function() {
	// Secured Controllers
	Route::get('events/assist/{id}', 'EventController@assist');
});

Route::resource('events', 'EventController');
Route::model('events', 'App\Event');

// /users API
Route::resource('users', 'UserController');
Route::model('users', 'App\User');

// Secured Controllers
//Route::group(['middleware' => 'jwt.auth'], function() {
	// Secured Controllers
//});