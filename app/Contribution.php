<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Contribution extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
    
    protected $fillable = ['amount', 'user_id', 'supply_id'];

    protected $casts = [
        'amount' => 'integer'
    ];

    public function user() {
        return $this->belongsTo('App\User')->select(['id', 'name', 'avatar']);
    }

}
