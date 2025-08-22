import MonthlyExpensesChart from '@/components/dashboard/MonthlyExpensesChart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({this_month_expenses, monthly_expenses}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
           <div className="bg-white shadow rounded-lg p-4 w-full max-w-xl m-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">This Month Expenses</h2>
                <div className="flex flex-col gap-2">
                    {this_month_expenses.map((expense) => {
                       return (
                            <div className="flex justify-between text-gray-700">
                                <span>{expense.category_name}</span>
                                <span>{Number(expense.amount).toLocaleString()}</span>
                            </div>
                        )
                    })}
                    <hr />
                    <div className="flex justify-between text-gray-700 font-bold">
                        <span>Total</span>
                        <span>{this_month_expenses
                            .reduce((sum, expense) => sum + Number(expense.amount), 0)
                            .toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 w-full max-w-5xl m-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Monthly Expenses</h2>
                <MonthlyExpensesChart monthlyExpenses={monthly_expenses} />
            </div>


        </AppLayout>
    );
}
