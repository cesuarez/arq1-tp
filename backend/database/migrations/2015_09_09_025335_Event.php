<?php

use Jenssegers\Mongodb\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Event extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->datetime('date');
            $table->enum('privacy', ['private', 'public']);
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->text('proposed_requirements')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('events');
    }
}
