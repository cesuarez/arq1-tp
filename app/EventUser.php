<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class EventUser extends Model {

	protected $table = 'event_user';

	protected $casts = [
        'assistance' => 'boolean',
        'owner' => 'boolean'
    ];
    
    public function user() {
        return $this->belongsTo('App\User');
    }
    
    public static function findByUserAndEvent($userId, $eventId){
        return self::where('user_id', $userId)->where('event_id', $eventId)->first();
    }

}
