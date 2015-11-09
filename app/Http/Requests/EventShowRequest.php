<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class EventShowRequest extends Request {

	public function authorize() {
        $event = $this->route('events');

		try {
        	if($event->privacy == "private") {
	            if ($user = \JWTAuth::parseToken()->authenticate()) {
	            	return $event->privateVisibleforUser($user->id);
	            } else {
        			return false;
	            }
    	   	}
        } catch (\Exception $e) {
            return false;
        }

		return true;
	}

	public function rules() {
		return [];
	}

}
