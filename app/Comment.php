<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model {
    
    use SoftDeletes;
    
    protected $dates = ['deleted_at'];

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

}
