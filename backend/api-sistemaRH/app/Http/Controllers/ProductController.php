<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        $products = ['Notebook', 'Mouse', 'Teclado'];
        return response()->json(['message' => 'API funcionando!']);
    }
}
