import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Plus, X } from "lucide-react";
import dayjs from 'dayjs';
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/expenses',
    },
];

interface AddExpense {
  title: string;
  amount: string;
  category: string;
}

export default function AllExpense({expenses, categories}){
    const [showModal, setShowModal] = useState(false);

     const { data, setData, post, processing, reset, put } = useForm<Required<AddExpense>>({
            title: "",
            amount: "",
            category: ''
          });

    const handleAddExpense = () => {
        if(data.title && data.amount && data.category){
            post(route('expenses.add'), {
                 onFinish: () => {
                   reset()
                   setShowModal(false)
                   alert('Expense Added Successfully')
               }
             });
        }
        else{
            alert('Please fill up all the inputs.')
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
                    <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                    >
                    <Plus size={18} />
                    Add Expense
                    </button>
                </div>


                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Created At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {expenses.data.map((expense, index) => (
                                <tr key={expense.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{expense.title}</td>
                                    <td className="py-3 px-4 text-gray-600">{expense.amount}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {expense.category.name}
                                    </td>
                                   <td>{dayjs(expense.created_at).format('MMM D, YYYY h:mm A')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <nav>
                    <ul className="flex justify-center space-x-2 mt-4">
                        {expenses.links.map((link, index) => (
                        <li
                            key={index}
                            className={`rounded ${
                            link.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } ${link.url === null ? "opacity-50 pointer-events-none" : ""}`}
                        >
                            <Link
                            href={link.url || "#"}
                            className="px-3 py-1 block"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        </li>
                        ))}
                    </ul>
                </nav>


                {/* Add Category Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mx-4">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                                </div>
                                <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                    </label>
                                    <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => {
                                        setData(prev => ({
                                            ...prev,
                                            title: e.target.value
                                            }));
                                    }}
                                    placeholder="Enter category name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount
                                    </label>
                                    <input
                                    type="text"
                                    value={data.amount}
                                    onChange={(e) => {
                                        setData(prev => ({
                                            ...prev,
                                            amount: e.target.value
                                            }));
                                    }}
                                    placeholder="Enter category name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                    </label>
                                    <select value={data.category} onChange={(e) => {
                                        setData(prev => ({
                                            ...prev,
                                            category: e.target.value
                                            }));
                                    }} name="" id="" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors">
                                        <option value="">Select Category</option>
                                        {categories.map((category) => {
                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button onClick={handleAddExpense} className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                {processing ? 'Adding ....' : 'Add Expense'}
                            </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
