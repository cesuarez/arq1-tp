<?php

Route::get('/', function () {
    return File::get(public_path().'/app.html');
});


// Authentication
Route::get('login', 'AuthController@login');

// /events API
Route::get('events/mostRecent', 'EventController@mostRecent');
Route::get('events/count', 'EventController@count');
Route::resource('events', 'EventController');
Route::model('events', 'App\Event');