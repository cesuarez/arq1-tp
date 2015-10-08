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
