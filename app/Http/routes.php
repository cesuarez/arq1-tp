<?php

Route::get('/', function () {
    return File::get(public_path().'/app.html');
});

// /events REST
Route::get('events/mostRecent', 'EventController@mostRecent');
Route::get('events/count', 'EventController@count');
Route::resource('events', 'EventController');
Route::model('events', 'App\Event');