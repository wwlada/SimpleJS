<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditProductRequest;
use App\Http\Requests\ProductRequest;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Products::all();

        if ($request->ajax()) {
            return view('table', compact('products'));
        }
        return view('products', compact('products'));
    }

    public function store(ProductRequest $request)
    {
        Products::create($request->validated());

        return response()->noContent();
    }

    public function update(EditProductRequest $request, Products $product)
    {
        $product->update($request->validated());

        return response()->noContent();
    }

    public function destroy(Products $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
