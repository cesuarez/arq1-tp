<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Http\Requests\SupplyStoreRequest;

use App\Event;
use App\Supply;
use App\Contribution;

class EventSuppliesController extends Controller {

	public function __construct() {
//        $this->middleware('jwt.auth', ['only' => 
//            ['store', 'update', 'destroy']
//        ]);
    }
    
    private function returnAllSupplies($event_id) {
    	return response()->json([
    	    'supplies' => 
    	        Supply::with('contributions')
    	                ->where('event_id', $event_id)
    	                ->get()
    	]);
    }

    public function index(Request $request, $event) {
        return response()->json(['supplies' => $event->supplies()->with('contributions')->get()]);
    }

    public function store(SupplyStoreRequest $request, $event) {
    	$supply = 
    	    Supply::where('name', 'like', $request->name)
    	        ->where('event_id', $event->id)
    	        ->first();
    	
    	if($supply) {
        	$supply->fill($request->all());
       		$supply->save();
    	} else {
        	$supply = new Supply($request->all());
        	$event->supplies()->save($supply);
        	if(!$request->required) {
        	    $contribution = new Contribution([ 
        	        "user_id" => $request->user->id,  
        	        "amount"  => $supply->amount,
        	    ]);
        	    $supply->contributions()->save($contribution);
        	}
    	}

    	$fulfilled = $supply->contributions()->sum('amount');
    	if(!$request->required && $fulfilled < $supply->amount) {
    	    $contribution = new Contribution([ 
    	        "user_id" => $request->user->id,  
    	        "amount"  => $supply->amount - $fulfilled,
    	    ]);
    	    $supply->contributions()->save($contribution);
    	}
    	
        return $this->returnAllSupplies();
    }

    public function update(SupplyStoreRequest $request, $event, $supply) {
    	$supply->fill($request->all());
   		$supply->save();
        return $this->returnAllSupplies($event->id);
    }

    public function destroy($event, $supply) {
    	$supply->delete();
        return $this->returnAllSupplies($event->id);
    }

}
