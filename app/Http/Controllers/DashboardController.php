<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function Index(){
        $this_month_expenses = Expense::leftJoin(
                        'categories', 'expenses.category_id', '=', 'categories.id'
                    )
                    ->select(
                        'categories.name as category_name',
                        DB::raw('SUM(expenses.amount) as amount')
                    )
                    ->whereMonth('expenses.created_at', Carbon::now()->month)
                    ->groupBy('categories.name')
                    ->orderByDesc('amount')
                    ->get();
       $monthly_expenses = Expense::select(
                DB::raw('MONTH(created_at) as monthNumber'),
                DB::raw('SUM(amount) as total')
            )
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('monthNumber')
            ->get()
            ->keyBy('monthNumber');

        // Generate months Start to current
        $currentMonth = Carbon::now()->month;
        $months = [];

        for ($i = 1; $i <= $currentMonth; $i++) {
            $months[] = [
                'month' => Carbon::create()->month($i)->format('M'),
                'total' => isset($monthly_expenses[$i]) ? $monthly_expenses[$i]->total : 0,
            ];
        }

        return Inertia::render('dashboard',[
            'this_month_expenses' => $this_month_expenses,
            'monthly_expenses' => $months
        ]);
    }
}
