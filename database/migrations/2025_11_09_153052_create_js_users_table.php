<?php

use App\Models\JsUser;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(JsUser::TABLE, function (Blueprint $table) {
            $table->id();
            $table->string('name', 64);
            $table->unsignedSmallInteger('age');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(JsUser::TABLE);
    }
};
