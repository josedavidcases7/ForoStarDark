<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins_chats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_event_id');
            $table->text('message');
        
            $table->foreign('admin_event_id')->references('id')->on('admins_events');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins_chats');
    }
};
