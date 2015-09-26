<?php

Route::get('/', function () {
    return File::get(public_path().'/app.html');
});


// /events REST
Route::resource('events', 'EventController');
Route::model('events', 'App\Event');
