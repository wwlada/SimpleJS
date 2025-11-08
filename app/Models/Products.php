<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    const TABLE_NAME = 'products';
    protected $table = self::TABLE_NAME;
    protected $fillable = ['name'];
}
