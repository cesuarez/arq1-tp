<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model {

	// Cannot be changed
    protected $guarded = ['id'];

    // Cannot be accessed
    protected $hidden = ['created_at', 'updated_at'];
}
