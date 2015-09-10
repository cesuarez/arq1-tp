<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Event;

class EventController extends Controller {

    // GET "/events"
    public function index() {
        $events = Event::all();
        return response($events, 200);
    }

    // POST "/events"
    //{ "name": "choripateada", "description": "Choripateada despedida Fidel", "privacy": "public", "date": "2012-04-23T18:25:43.511Z", "location": "unq", "proposed_requirements": "paty,ensalada,chorizo"}
    public function store(Request $request) {
        $event = Event::create($request->all());
        return response($event, 200);
    }

    // GET "/events/:id"
    public function show($event) {
        return response($event, 200);
    }

    // PUT "/events/:id"
    public function update(Request $request, $event) {
        $event->fill($request->all());
        $event->save();
        return response($event, 200);
    }

    // DELETE "/events/:id"
    public function destroy($event) {
        $event->delete();
        return response(Event::all(), 200);
    }
}
