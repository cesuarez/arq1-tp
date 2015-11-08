<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Events extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->date('date');
            $table->string('img');
            $table->enum('privacy', ['private', 'public']);
            $table->string('location')->nullable();
            
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('weather')->nullable();
            
            $table->text('description')->nullable();
            $table->timestamps();

			$table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::drop('events');
    }
}
