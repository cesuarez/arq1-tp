<?php namespace App;

use Log;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword; 

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'email', 'avatar'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['remember_token', 'password'];

    public function events() {
        return $this->hasMany('App\Events');
    }

	public static function findByUserOrCreate($userData){
		$avatarUrl = strtok($userData->avatar, '?');
		$avatarUrl = $avatarUrl . '?width=100&height=100';
		return self::firstOrCreate([
			'name' => $userData->user["first_name"],
            'email' => $userData->email,
            'avatar' => $avatarUrl
		]);
	}

}

