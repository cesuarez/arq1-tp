<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Http\Requests\CommentRequest;
use App\Http\Requests\EventShowRequest;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Event;
use App\Comment;

use JWTAuth;

use Forecast\Forecast;

class EventController extends Controller {

	public function __construct() {
        $this->middleware('jwt.auth', ['only' => 
            ['addComment', 'store', 'destroy']
        ]);
    }

    // GET "/events" 
    public function index() {
        $events = Event::paginate(6);
        return response($events, 200);
    }

    // GET "/events/mostRecent" 
    public function mostRecent() {
        $events = Event::mostRecent()->paginate(6);
        return response($events, 200);
    }
    
    // GET "/events/byUser" 
    public function byUser($id) {
        $events = Event::byUser($id)->paginate(6);
        return response($events, 200);
    }

    // GET "/events/comments/{id}" 
    public function comments($id) {
        return response(Event::findComments($id), 200);
    }

    // POST "/events/comment" 
    public function addComment(CommentRequest $request) {
        $comment = Comment::create($request->all());
        return response(Event::findComments($comment->event_id), 200);
    }

    // GET "events/weather/{id}" 
    public function weather($id) {
        $event = Event::find($id);
        return response()->json($event->weather, 200);
    }

    // POST "/events"
    //{ "name": "choripateada", "description": "Choripateada despedida Fidel", "privacy": "public", "date": "2012-04-23T18:25:43.511Z", "location": "unq"}
    public function store(EventRequest $request) {
        $event = new Event($request->all());

        $forecastKey = \Config::get('services.forecast')['app_key'];
        $forecast = new Forecast($forecastKey);
        $event->weather = $forecast->get($event->latitude, $event->longitude)->currently->icon;
        $event->save();
        return response($event, 200);
    }

    // GET "/events/:id"
    public function show(EventShowRequest $request, $event) {
        return response($event, 200);
    }

    // PUT "/events/:id"
    public function update(EventRequest $request, $event) {
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
