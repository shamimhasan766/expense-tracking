import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Edit, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/categories',
    },
];

interface AddCategory {
  name: string;
  description: string;
}

export default function AllCategory({categories}){
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editCategory, setEditCategory] = useState<string>('');

     const { data, setData, post, processing, reset, put } = useForm<Required<AddCategory>>({
            name: "",
            description: ""
          });

    const handleAddCategory = () => {
        if(data.name && data.description){
            post(route('categories.add'), {
                 onFinish: () => {
                   reset()
                   setShowModal(false)
                   alert('Categories Added Successfully')
               }
             });
        }
        else{
            alert('Please fill all the input')
        }
    }

    const handleStatus = (id) => {
            router.put(route('categories.status-change', id), {}, {
                preserveScroll: true
            });
    }

    const handleEdit = (category) => {
        setData({
            name: category.name,
            description: category.description
        })
        setEditMode(true)
        setEditCategory(category.id)
        setShowModal(true)
    }

    const updateCategory = () => {
        if (!editCategory) return;
        put(route("categories.update", editCategory), {
        onSuccess: () => {
            reset()
            setEditMode(false)
            setEditCategory('')
            setShowModal(false)
        }
        });
    }

    function handleDelete(id) {
        router.delete(route('categories.delete'), {
            data: { id: id },
            preserveScroll: true
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                    <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                    >
                    <Plus size={18} />
                    Add Category
                    </button>
                </div>


                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories?.map((category, index) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{category.name}</td>
                                    <td className="py-3 px-4 text-gray-600">{category.description}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                        {category.status === 0 ? (
                                            <span
                                                onClick={() => handleStatus(category.id)}
                                                className="cursor-pointer bg-red-500 px-2 py-1 rounded text-white text-sm"
                                            >
                                                Deactive
                                            </span>
                                        ) : (
                                            <span
                                                onClick={() => handleStatus(category.id)}
                                                className="cursor-pointer bg-green-500 px-2 py-1 rounded text-white text-sm"
                                            >
                                                Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(category)}
                                                className="cursor-pointer text-blue-600 hover:text-blue-800 p-1"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="cursor-pointer text-red-600 hover:text-red-800 p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add Category Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md mx-4">
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
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
                                    Category Name
                                    </label>
                                    <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData(prev => ({
                                            ...prev,
                                            name: e.target.value
                                            }));
                                    }}
                                    placeholder="Enter category name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                    </label>
                                    <textarea
                                    value={data.description}
                                    onChange={(e) => {
                                        setData(prev => ({
                                            ...prev,
                                            description: e.target.value
                                            }));
                                    }}
                                    placeholder="Enter category description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button onClick={editMode ? updateCategory : handleAddCategory} className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                {processing ? (editMode ? 'Updating' : 'Adding ....') : (editMode ? 'Update' : 'Add Category')}
                            </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
