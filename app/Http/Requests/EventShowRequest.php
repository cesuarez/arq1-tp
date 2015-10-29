<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class EventShowRequest extends Request {

	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize()
	{
        $event = $this->route('events');
        
        if($event->privacy == "private") {
			try {
	            if (!$user = \JWTAuth::parseToken()->authenticate()) {
	            	return $event->user_id == $user->id;
	            }
	        } catch (\Exception $e) {
	            return false;
	        }
       }

		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			//
		];
	}

}
