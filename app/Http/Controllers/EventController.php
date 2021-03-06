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

class EventController extends Controller {

	public function __construct() {
        $this->middleware('jwt.auth', ['only' => 
            ['addComment', 'store', 'destroy', 'assist', 'invite']
        ]);
    }

    // GET "/events" 
    public function index(AuthRequest $request) {
        $eventsPage = Event::search($request);
        array_map(function($event) use ($request){
            $event->attachOwner($request->user);
        }, $eventsPage->items());
        return response()->json($eventsPage);
    }

    // GET "/events/comments/{id}" 
    public function comments($id) {
        return response()->json(Event::findComments($id));
    }

    // POST "/events/comment" 
    public function addComment(CommentRequest $request) {
        $comment = Comment::create($request->all());
        return response()->json(Event::findComments($comment->event_id));
    }

    // GET "events/weather/{id}" 
    public function weather($id) {
        $event = Event::find($id);
        return response()->json($event->attachWeather());
    }

    // POST "events/assist/{id}" 
    public function assist($id, AuthRequest $request) {
        $event = Event::find($id);
        $event->changeAssistance($request->input('assistance'), $request->user);
        $event->save();
        $event->attachAssistingUsers();
        return response()->json($event->getAssistingUsers());
    }

    // GET "events/{id}/uninvited-users/{name}" 
    public function uninvitedUsers(Request $request, $id, $name = ''){
        $event = Event::find($id);
        return response()->json($event->searchUninvitedUsers($name));
    }

    // POST "events/invite/{id}"
    public function invite(Request $request, $id){
        $event = Event::find($id);
        $event->invite($request->input('userId'));
        return response()->json([ 'msg' => 'User invited']);
    }
    
    // POST "/events"
    public function store(EventRequest $request) {
        $userId = $request->input('user_id');
        $event = new Event($request->except(['user_id']));
        $event->save();
        $event->addUserRelation($userId, true, true);
        return response()->json($event);
    }

    // POST "/events/:id"
    public function update(EventRequest $request, $id) {
        $event = Event::with('users')->find($id);
        $event->fill($request->all());
        $event->save();
        return response()->json($event);
    }

    // GET "/events/:id"
    public function show(EventShowRequest $request, $event) {
        $event->attachWeather();
        $event->attachAssistance($request->user);
        $event->attachSupplies($request->user);
        $event->attachOwner($request->user);
        $event->attachAssistingUsers();
        return response()->json($event);
    }

    // DELETE "/events/:id"
    public function destroy($event) {
        $event->delete();
        return response()->json([ 'msg' => 'deleted']);
    }
    
}
