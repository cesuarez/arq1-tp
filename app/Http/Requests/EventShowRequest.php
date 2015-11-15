<?php namespace App\Http\Requests;

//use App\Http\Requests\Request;
use App\Http\Requests\AuthRequest;

class EventShowRequest extends AuthRequest {

	public function authorize() {
        $event = $this->route('events');
        
		if ($this->user){
			if($event->privacy === "private") {
	            if ($this->user) {
	            	return $event->privateVisibleforUser($this->user->id);
	            } else {
	    			return false;
	            }
		   	} else {
				return true;
		   	}
		} else {
			return $event->privacy !== "private";
		}
		
	}

}
