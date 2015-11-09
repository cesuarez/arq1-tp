<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class EventUser extends Model {

	protected $table = 'Event_User';

	protected $casts = [
        'assistance' => 'boolean',
        'owner' => 'boolean'
    ];


}
