<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model {
    
    use SoftDeletes;
    
    protected $dates = ['deleted_at'];

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['deleted_at'];
    
    public function user() {
        return $this->belongsTo('App\User');
    }

}
