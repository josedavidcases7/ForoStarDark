<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id(); // clave primaria 'id' por convención
            $table->text('description');
            $table->integer('likes')->default(0);
            $table->longText('image')->nullable(); // para base64 largo
            $table->string('user_name', 191);
            $table->text('user_profile_image')->nullable(); // base64 o URLs largas
            
   
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
