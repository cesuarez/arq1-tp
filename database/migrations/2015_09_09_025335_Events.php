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
            $table->text('description')->nullable();
            $table->date('date');
            $table->string('img');
            $table->enum('privacy', ['private', 'public']);
            
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('weather')->nullable();
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('events');
    }
}
