<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Supply extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
    
    protected $fillable = ['amount', 'event_id', 'name', 'required'];
    
    protected $casts = [
        'required' => 'boolean',
        'amount' => 'integer'
    ];

    public function event() {
        return $this->belongsTo('App\Event');
    }

    public function contributions() {
        return $this->hasMany('App\Contribution');
    }

    public static function findByEvent($id) {
        return self::where('event_id', $event->id)->with('contributions')->get();
    }
    
}
