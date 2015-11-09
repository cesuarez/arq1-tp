<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventUserTable extends Migration {

	public function up() {
		Schema::create('event_user', function(Blueprint $table) {
			$table->boolean('assistance');
			$table->boolean('owner');
			$table->timestamps();
			
			$table->integer('event_id')->unsigned()->index();
			$table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
			
			$table->integer('user_id')->unsigned()->index();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
		});
	}

	public function down() {
		Schema::drop('event_user');
	}

}
