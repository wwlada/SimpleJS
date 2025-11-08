<?php

use App\Models\Products;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(Products::TABLE_NAME, function (Blueprint $table) {
            $table->id();
            $table->string('name', 128);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(Products::TABLE_NAME);
    }
};
