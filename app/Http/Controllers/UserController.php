<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;

use Illuminate\Http\Request;

class UserController extends Controller {

	// GET "/users" 
	public function index()
	{
        $users = User::paginate(6);
        return response($users, 200);
	}

	// GET "/users/:id"
	public function show($user)
	{
		return response($user, 200);
	}

	// PUT "/users/:id"
	public function update(UserRequest $request, $user)
	{
        $user->fill($request->all());
        $user->save();
        return response($user, 200);
	}

	// DELETE "/users/:id"
	public function destroy($user)
	{
        $user->delete();
        return response(User::all(), 200);
	}

}
