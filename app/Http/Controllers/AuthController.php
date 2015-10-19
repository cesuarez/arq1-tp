<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Auth;
use Illuminate\Contracts\Auth\Guard;

use App\User;

use Illuminate\Http\Request;

class AuthController extends Controller {

	public function login(Guard $auth, Request $request){
		if (! $request->has('code')) return $this->getAuthorizationFirst();

		/*User {#189 ▼
		  +token: "CAANnLZAfE93kBAC2JfJjmB8BS5GPGYI9GFY8gaSIdnWxkNgNBBRurJwgjEq1SSZBo7OVeIZA3qm10YmXT2woAUZABkxQea5KZBW9iqSRQqxvbxiWbEiCCWBOUCGpC2LwXjgoN3ZARAy9pZCLRf4b7f2UmsT9Pm26dYuWzw4BlS2zgOM5Qk68ke6oh6Yxriru9YZD"
		  +id: "10206132994178603"
		  +nickname: null
		  +name: "Cristian Suarez"
		  +email: "cris_eze_sua@hotmail.com"
		  +avatar: "https://graph.facebook.com/v2.5/10206132994178603/picture?type=normal"
		  +"user": array:6 [▼
		    "first_name" => "Cristian"
		    "last_name" => "Suarez"
		    "email" => "cris_eze_sua@hotmail.com"
		    "gender" => "male"
		    "verified" => true
		    "id" => "10206132994178603"
		  ]
		  +"avatar_original": "https://graph.facebook.com/v2.5/10206132994178603/picture?width=1920"
		}*/
		$userData = \Socialite::with('facebook')->user();

		$user = User::findByUserOrCreate($userData);

		$auth->login($user, true);

		//response()->json(['logged' => Auth::check()]);
		return redirect('/#/' . $user->name);
	}

	private function getAuthorizationFirst(){
		return \Socialite::with('facebook')->redirect();
	}

}
