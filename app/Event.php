<?php

namespace App;

//use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Model;

use App\EventUser;

class Event extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
    
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

    public function privateVisibleforUser($userId){
        return EventUser::where('user_id', $userId)->count() > 0;
    }

    public function setAssistance($assistance){
        /*
        if ($assistance) {
            $this
        } else {
            $this
        }
        */
    }

    public function scopeMostRecent($query) {
        return $query->where('privacy', '=', 'public')->orderBy('created_at', 'desc');
    }
    
    public function scopeByUser($query, $id) {
        //return $query->where('user_id', '=', $id)->orderBy('created_at', 'desc');
        /*
        return $query
                ->with('users')
                ->where('users.id', '=', $id)
                ->orderBy('created_at', 'desc');

        */
        return $query->with('users')->whereHas('users', function($q) use ($id){
             $q->where('users.id', $id);
        })->orderBy('created_at', 'desc');
    }
    
}
