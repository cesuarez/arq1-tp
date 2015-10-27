<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
    
    public function comments() {
        return $this->hasMany('App\Comment');
    }

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function scopeMostRecent($query) {
        return $query->where('privacy', '=', 'public')->orderBy('created_at', 'desc');
    }
    
    public function scopeByUser($query, $id) {
        return $query->where('user_id', '=', $id)->orderBy('created_at', 'desc');
    }
    
}
