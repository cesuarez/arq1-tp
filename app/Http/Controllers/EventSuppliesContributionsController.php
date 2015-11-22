<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Http\Requests\ContributionStoreRequest;

use App\Event;
use App\Supply;
use App\Contribution;

class EventSuppliesContributionsController extends Controller {

	public function __construct() {
        $this->middleware('jwt.auth', ['only' => 
            ['store', 'destroy']
        ]);
    }

    private function returnAllContributions($supply_id) {
    	return response()->json([
    		'contributions' => 
    			Contribution::with('user')
					->where('supply_id', $supply_id)
					->get()
    	]);
    }
    
    public function store(ContributionStoreRequest $request, $event, $supply) {
        
    	$contribution = Contribution::
    	    where('user_id', $request->user->id)
    	    ->where('supply_id', $supply->id)
    	    ->first();
    	
    	if($contribution) {
        	$contribution->amount += $request->amount;
       		$contribution->save();
    	} else {
        	$contribution = new Contribution($request->all());
        	$contribution['user_id'] = $request->user->id;
        	$supply->contributions()->save($contribution);
    	}

        return $this->returnAllContributions($supply->id);
    }

    public function destroy($event, $supply, $contribution) {
    	$contribution->delete();
        return $this->returnAllContributions($supply->id);
    }

}
