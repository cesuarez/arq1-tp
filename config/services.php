<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Third Party Services
	|--------------------------------------------------------------------------
	|
	| This file is for storing the credentials for third party services such
	| as Stripe, Mailgun, Mandrill, and others. This file provides a sane
	| default location for this type of information, allowing packages
	| to have a conventional place to find your various credentials.
	|
	*/

	'mailgun' => [
		'domain' => '',
		'secret' => '',
	],

	'mandrill' => [
		'secret' => '',
	],

	'ses' => [
		'key' => '',
		'secret' => '',
		'region' => 'us-east-1',
	],

	'stripe' => [
		'model'  => 'App\User',
		'secret' => '',
	],

	'rollbar' => [
	    'access_token' => '225b854c742b4a318e7e28fcef39fad0',
	    'level' => 'debug'
	],

	'facebook' => [
	    'client_id' => '957870447589241',
	    'client_secret' => '579b5a70d9e56b5b44fe8f2d4be9814d',
	    'redirect' => getenv('OPENSHIFT_FACEBOOK_REDIRECT') ?: getenv('FACEBOOK_REDIRECT')
	], 

	'forecast' => [
		'app_key' => getenv('OPENSHIFT_FORECAST_KEY') ?: getenv('FORECAST_KEY')
	]

];
