<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:128',
        ];
    }
}
