<?php namespace App\Http\Requests;

//use App\Http\Requests\Request;
use App\Http\Requests\AuthRequest;

class SupplyStoreRequest extends AuthRequest {

	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
            "name" => "required",
            "amount" => "required|integer|min:0"
		];
	}

}
