import React, { useEffect, useState } from "react";
import { codeError } from "../../Utils/Functions/Functions";
import { getService } from "../../Utils/Service";
import { errorToast } from "../../Utils/Toast/Toast";

const Dashboard = () => {
    const [Data, setData] = useState({});
    const getDashboardStats = () => {
        try {
            getService("/dashboard/getDashboard")
                .then((response) => {
                    if (response?.data?.success) {
                        setData(response?.data?.data);
                    }
                }).catch((error) => {
                    errorToast(error?.message);
                })
        } catch (error) {
            codeError(error);
        }
    }
    useEffect(() => {
        getDashboardStats();
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            </header>

            {/* Main Content */}
            <main className="p-6">
                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-700">Total Categories</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-4">{Data?.totalCategory}</p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-700">Total Products</h2>
                        <p className="text-3xl font-bold text-gray-900 mt-4">{Data?.totalProduct}</p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-700">Low Stock Items</h2>
                        <p className="text-3xl font-bold text-red-600 mt-4">{Data?.lowStockItems ?? 0}</p>
                    </div>
                </div>

                {/* Product Table */}
                <div className="bg-white shadow rounded-lg mt-6 p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Products</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2 text-left text-sm">Name</th>
                                <th className="border p-2 text-left text-sm">Category</th>
                                <th className="border p-2 text-left text-sm">Stock</th>
                                <th className="border p-2 text-left text-sm">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2 text-sm">Almonds</td>
                                <td className="border p-2 text-sm">Nuts</td>
                                <td className="border p-2 text-sm text-green-600">50</td>
                                <td className="border p-2 text-sm">$10</td>
                            </tr>
                            <tr>
                                <td className="border p-2 text-sm">Pineapple</td>
                                <td className="border p-2 text-sm">Fruits</td>
                                <td className="border p-2 text-sm text-red-600">5</td>
                                <td className="border p-2 text-sm">$5</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
