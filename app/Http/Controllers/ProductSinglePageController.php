<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductSinglePageController extends Controller
{
    // 1) View
    public function index()
    {
        return view('products.index');
    }

    // 2) Read (list JSON)
    public function getAllProducts()
    {
        $products = Products::all();
        return response()->json($products);
    }

    //getProductById
    public function getProductById($id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'product' => $product
        ]);
    }

    // 3) Create
    public function createProduct(Request $request)
    {

        // Uzmi objekat 'product' iz requesta
        $name = $request->input('name');

        // Kreiraj novi proizvod
        $product = Products::create([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }

    // 4) Update
    public function updateProduct(Request $request, $id)
    {
        $product = Products::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $name = $request->input('name');

        $product->update([
            'name' => $name,
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
        ]);
    }

    // 5) Delete
    public function deleteProduct($id)
    {
        $product = Products::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted'], 200);
    }
}
