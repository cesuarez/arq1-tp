<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Http\Requests\CommentRequest;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Event;
use App\Comment;

class EventController extends Controller {

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
        $comments = Event::find($id)
            ->comments()
            ->orderBy('created_at', 'desc')
            ->with('user')
            ->paginate(5);
        return response($comments, 200);
    }

    // POST "/events/comment" 
    public function addComment(CommentRequest $request) {
        $comment = Comment::create($request->all());
        $comments = Event::find($comment->event_id)
            ->comments()
            ->orderBy('created_at', 'desc')
            ->with('user')
            ->paginate(5);
        return response($comments, 200);
    }

    // POST "/events"
    //{ "name": "choripateada", "description": "Choripateada despedida Fidel", "privacy": "public", "date": "2012-04-23T18:25:43.511Z", "location": "unq", "proposed_requirements": "paty,ensalada,chorizo"}
    public function store(EventRequest $request) {
        $event = Event::create($request->all());
        return response($event, 200);
    }

    // GET "/events/:id"
    public function show($event) {
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
