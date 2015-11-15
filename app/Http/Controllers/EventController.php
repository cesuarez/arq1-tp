<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Http\Requests\CommentRequest;
use App\Http\Requests\EventShowRequest;
use App\Http\Requests\AuthRequest;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Event;
use App\EventUser;
use App\Comment;

use Forecast\Forecast;

class EventController extends Controller {

	public function __construct() {
        $this->middleware('jwt.auth', ['only' => 
            ['addComment', 'store', 'destroy', 'assist']
        ]);
    }

    // GET "/events" 
    public function index(Request $request) {
        return response(Event::search($request), 200);
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

    // POST "events/assist/{id}" 
    public function assist($id, AuthRequest $request) {
        $event = Event::find($id);
        $event->changeAssistance($request->input('assistance'), $request->user);
        $event->save();

        return response()->json($event->participants, 200);
    }
    
    private function saveEvent($event) {
        $forecastKey = \Config::get('services.forecast')['app_key'];
        $forecast = new Forecast($forecastKey);
        $event->weather = $forecast->get($event->latitude, $event->longitude)->currently->icon;
        $event->save();
    }

    // POST "/events"
    public function store(EventRequest $request) {
        $userId = $request->input('user_id');
        $event = new Event($request->except(['user_id']));
        
        $this->saveEvent($event);

        $event->addUserRelation($userId, true, true);
        return response($event, 200);
    }

    // POST "/events/:id"
    public function update(EventRequest $request, $id) {
        $event = Event::with('users')->find($id);
        $event->fill($request->all());
        $this->saveEvent($event);
        return response($event, 200);
    }

    // GET "/events/:id"
    public function show(EventShowRequest $request, $event) {
        $event->checkAssistance($request->user);
        return response($event, 200);
    }

    // GET "/events/owner/:id"
    public function owner($id) {
        $owner = EventUser::where('event_id', $id)->where('owner', true)->with('user')->first();
        return response($owner->user, 200);
    }

    // DELETE "/events/:id"
    public function destroy($event) {
        $event->delete();
        return response(Event::all(), 200);
    }
}
