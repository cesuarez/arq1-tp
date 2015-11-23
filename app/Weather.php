<?php namespace App;

use Illuminate\Database\Eloquent\Model;

use Forecast\Forecast;
use Carbon\Carbon;
use DB;

class Weather extends Model {

	// Cannot be changed
    protected $guarded = ['id'];
    
    public static function weatherDB($latitude, $longitude, $date) {
        return self::select(DB::raw("*,
                      ( 6371 * acos( cos( radians(?) ) *
                        cos( radians( latitude ) )
                        * cos( radians( longitude ) - radians(?)
                        ) + sin( radians(?) ) *
                        sin( radians( latitude ) ) )
                      ) AS distance"))
            ->havingRaw("distance < 800")
            ->orderBy("distance")
            ->setBindings([$latitude, $longitude, $latitude])
            ->whereBetween('date',
                [
                    Carbon::parse($date)->startOfDay(),
                    Carbon::parse($date)->endOfDay()
                ])
            ->first();
    }
    
    public static function weather($latitude, $longitude, $date) {
        $cachedWeather = self::weatherDB($latitude, $longitude, $date);
        if($cachedWeather !== null) {
            return $cachedWeather->weather;
        } else {
            $forecastKey = \Config::get('services.forecast')['app_key'];
            $forecast = new Forecast($forecastKey);
            $forecastWeather = $forecast->get($latitude, $longitude, 
                Carbon::parse($date)->timestamp)->currently->icon;
            $weather = self::create([
                'latitude' => $latitude, 
                'longitude' => $longitude,
                'weather' => $forecastWeather,
                'date' => $date
            ]);
            return $weather->weather;
        }
    }
    

}
