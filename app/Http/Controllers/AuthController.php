<?php namespace App\Http\Controllers;

use Log;

use App\Http\Requests;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Request as SelfRequest;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\User;

class AuthController extends Controller {

	public function __construct(){
        $this->middleware('jwt.auth', ['except' => ['login', 'auth']]);
    }

	public function user(){
		try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found' => 'The user does not exist'], 401);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired' => 'The received token is not longer valid'], 401);
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid' => 'The token received is not valid'], 401);
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent' => 'The token is missing in the request'], 401);
        }
        
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
	}

	public function login(Request $request){
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
		$user->password = \Hash::make('');
		$user->save();

		$token = $this->createJWT($user->email);
		if ($token == 'invalid_credentials' || $token == 'could_not_create_token'){
			$url = '/#/' . $token;
		} else {
			$url = '/#/login/' . $token;
		}

		return redirect($url);
	}

	private function createJWT($email){
		$credentials = [
			'email' => $email,
			'password' => '',
		];

		try {
            if (! $token = JWTAuth::attempt($credentials)) {
            	return 'invalid_credentials';
            }
        } catch (JWTException $e) {
            return 'could_not_create_token';
        }

        $compactedToken = compact('token')['token'];
        return $compactedToken;
	}

	private function getAuthorizationFirst(){
		return \Socialite::with('facebook')->redirect();
	}

}
