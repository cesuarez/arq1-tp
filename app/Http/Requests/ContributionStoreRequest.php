<?php namespace App\Http\Requests;

use App\Http\Requests\AuthRequest;

class ContributionStoreRequest extends AuthRequest {

	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			'amount' => 'required|integer|min:0'
		];
	}

}
