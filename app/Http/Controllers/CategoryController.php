<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function Index(){
        $categories = Category::all();
        return Inertia::render('category/AllCategory', [
            'categories' => $categories
        ]);
    }

    public function addCategory(Request $request){
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);
        try {
            $newCategory = new Category();
            $newCategory->name = $request->name;
            $newCategory->description = $request->description;
            $newCategory->save();
            return back();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function statusChange($id) {
        $category = Category::find($id);
        $category->status = $category->status == 1 ? 0 : 1;
        $category->save();
        return back();
    }

     public function updateCategory(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();

        return back();
    }

    public function deleteCategory(Request $request){
        $request->validate([
            'id' => 'required|exists:categories,id'
        ]);

        try {
            Category::find($request->id)->delete();
            return back();
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
