<?php

Route::get('/', function () {
    return view('welcome');
});


// /events REST
Route::resource('events', 'EventController');
Route::model('events', 'App\Event');
