<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function Index() {
        $categories = Category::where('status', 1)->get();

        $expenses = Expense::latest()->with('category')->paginate(10);
        return Inertia::render('expense/AllExpense', [
            'expenses' => $expenses,
            'categories' => $categories
        ]);
    }

    public function addExpense(Request $request){
        $request->validate([
            'title' => 'required|string',
            'amount' => 'required|numeric',
            'category' => 'required|exists:categories,id'
        ]);

        $newExpense = new Expense();
        $newExpense->title = $request->title;
        $newExpense->amount = $request->amount;
        $newExpense->category_id = $request->category;
        $newExpense->save();

        return back();
    }
}
