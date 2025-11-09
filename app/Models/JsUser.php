<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JsUser extends Model
{
    const TABLE = 'js_users';
    protected $table = self::TABLE;
    protected $fillable = ['name', 'age'];
}
