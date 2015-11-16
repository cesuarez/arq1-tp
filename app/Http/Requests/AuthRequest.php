<?php namespace App\Http\Requests;

use App\Http\Requests\Request;

class AuthRequest extends Request {

	public function __construct() {
		try {
			$this->user = \JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
        	$this->user = null;
        }
	}

	public function authorize()	{
		return true;
	}

	public function rules()	{
		return [];
	}

}
