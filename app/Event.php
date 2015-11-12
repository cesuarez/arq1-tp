<?php

namespace App;

//use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Model;

use App\EventUser;
use Carbon\Carbon;

class Event extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
    
    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->toIso8601String();
    }
    
    public function comments() {
        return $this->hasMany('App\Comment');
    }

    public function users() {
        return $this->belongsToMany('App\User')->withPivot('assistance', 'owner')->withTimestamps();
    }

    public static function findComments($eventId) {
        return self::find($eventId)
            ->comments()
            ->orderBy('created_at', 'desc')
            ->with('user')
            ->paginate(5);
    }

    public function privateVisibleforUser($userId) {
        return EventUser::where('user_id', $userId)->count() > 0;
    }

    public function setAssistance($assistance) {
        /*
        if ($assistance) {
            $this
        } else {
            $this
        }
        */
    }
    
    public static function search($request) {
        $q = Event::query();

        if ($request->has('text')) {
            $q->where(function ($query) {
                 $query->orwhere('name', 'like', '%' . $request->text . '%');
                 $query->orwhere('description', 'like', '%' . $request->text . '%');
            });
        }

        if ($request->has('privacy')) {
             $q->where('privacy', '=', $request->privacy);
        }
        
        if($request->has('before')) {
            $q->where('date', '<=', Carbon::parse($request->before));
        }

        if($request->has('after')) {
            $q->where('date', '>=', Carbon::parse($request->after));
        }
        
        return $q->orderBy('created_at', 'desc')->paginate(6);
    }
    
    public function scopeByUser($query, $id) {
        return $query->with('users')->whereHas('users', function($q) use ($id){
             $q->where('users.id', $id);
        })->orderBy('created_at', 'desc');
    }
    
}
