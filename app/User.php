<?php namespace App;

use Log;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword; 

	protected $table = 'users';

	protected $fillable = ['name', 'email', 'avatar'];

	protected $hidden = ['remember_token', 'password'];

    public function events() {
        return $this->belongsToMany('App\Event')->withPivot('assistance', 'owner')->withTimestamps();
    }

	public static function findByUserOrCreate($userData){
		$avatarUrl = strtok($userData->avatar, '?');
		$avatarUrl = $avatarUrl . '?width=100&height=100';
		
		$user = self::firstOrNew([
            'email' => $userData->email
		]);

		if(!$user->id) {
			$user->name = $userData->name;
			$user->avatar = $avatarUrl;
		}

		$user->save();
		return $user;
	}

}

