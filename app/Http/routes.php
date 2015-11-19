<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;

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
Route::post('events/assist/{id}', 'EventController@assist');

Route::resource('events', 'EventController', ['except' => ['update']]);
Route::post('/events/{id}', 'EventController@update');
Route::model('events', 'App\Event', function() {
	throw new ModelNotFoundException;
});

// /events supplies API
Route::resource('events.supplies', 'EventSuppliesController', ['except' => ['show']]);
Route::model('supplies', 'App\Supply', function() {
	throw new ModelNotFoundException;
});

// /events supplies contributions API
Route::resource('events.supplies.contributions', 
	'EventSuppliesContributionsController', 
	['except' => ['show', 'update', 'index']]
);
Route::model('contributions', 'App\Contribution', function() {
	throw new ModelNotFoundException;
});

// /users API
Route::resource('users', 'UserController');
Route::model('users', 'App\User');

// Secured Controllers
//Route::group(['middleware' => 'jwt.auth'], function() {
	// Secured Controllers
//});
