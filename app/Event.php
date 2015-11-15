<?php

namespace App;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Model;

use App\EventUser;
use Carbon\Carbon;

class Event extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
    
    protected $fillable = ['name', 'description', 'date', 'img', 'privacy', 'latitude', 'longitude', 'weather'];
    
    public function supplies() {
        return $this->hasMany('App\Supply');
    }
    
    public function checkAssistance($user) {
        if ($user){
            $eventUserRelation = EventUser::findByUserAndEvent($user->id, $this->id);
            if ($eventUserRelation !== null) {
                $this->assistance = $eventUserRelation->assistance;
            }
        }
    }
    
    public function attachSupplies($user) {
        if ($user){
            $eventUserRelation = EventUser::findByUserAndEvent($user->id, $this->id);
            if ($eventUserRelation !== null && $eventUserRelation->assistance) {
                $this->supplies = self::supplies()->with('contributions')->get();
            }
        }
    }
    
    public function attachOwner($user) {
        $this->owner = EventUser::findOwnerByEvent($this->id);
        $this->isOwner = $user->id === $this->owner->id;
    }
    
    public function changeAssistance($assistance, $userId){
        if ($user){
            $eventUserRelation = EventUser::findByUserAndEvent($userId, $this->id);
            if ($eventUserRelation !== null) {
                $eventUserRelation->assistance = assistance;
            } else {
               $this->addUserRelation($userId, assistance, false); 
            }
        }
    }

    public function getDateAttribute($value)
    {
        return Carbon::parse($value)->toIso8601String();
    }
    
    public function addUserRelation($userId, $assistance, $owner) {
        $this->users()->attach($userId, ['assistance' => $assistance, 'owner' => $owner]);
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

    public function addAssistance($userId, $assistance) {
        if ($this->privacy == 'private'){
            $this->users->updateExistingPivot($userId, ['assistance' => $assistance]);
        } else if ($assistance == true){
            try {
                $this->users->findOrFail($userId);
                $this->users->updateExistingPivot($userId, ['assistance' => $assistance]);
            } catch (ModelNotFoundException $e) {
                $this->users()->attach($userId, ['assistance' => $assistance, 'owner' => false]);
            }

        }
    }
    
    public static function search($request) {
        $q = Event::query();

        if ($request->has('text')) {
            $q->where(function ($query) use ($request) {
                 $query->orwhere('name', 'like', '%' . $request->text . '%');
                 $query->orwhere('description', 'like', '%' . $request->text . '%');
            });
        }

        if ($request->has('privacy')) {
             $q->where('privacy', $request->privacy);
        }
        
        if($request->has('before')) {
            $q->where('date', '<=', Carbon::parse($request->before)->endOfDay());
        }

        if($request->has('after')) {
            $q->where('date', '>=', Carbon::parse($request->after)->startOfDay());
        }
        
        if($request->has('userId')) {
            $q->byUser($request->userId);
        }
        
        if($request->has('pageSize')) {
            $pageSize = $request->pageSize;
        } else {
            $pageSize = 6;
        }
        
        return $q->orderBy('created_at', 'desc')->paginate($pageSize);
    }
    
    public function scopeByUser($query, $id) {
        return $query->with('users')->whereHas('users', function($q) use ($id){
             $q->where('users.id', $id);
        })->orderBy('created_at', 'desc');
    }
    
}
