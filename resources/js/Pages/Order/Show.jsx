import React, { useMemo } from "react";
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TransactionsTable from "./Partials/TransactionsTable";
import OrderDetailsTable from "./Partials/OrderDetailsTable";

const Show = ({auth}) => {
    const { order } = usePage().props;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        <Link
                            href={route("orders.index")}
                            className="text-gray-500 hover:text-gray-800"
                        >
                            Orders
                        </Link>
                        <span className="font-medium"> / </span>
                        Orders# {order.id}
                    </h2>}
        >
            <Head title="Orders" />
            <div className="container mx-auto py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    <header>
                         <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
                        </header>
                        <div className="py-2">
                            <p>Name: {order['user']['name']}</p>
                            <p>Email: {order['user']['email']}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                    <header>
                         <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
                        </header>
                        <div className="py-2">
                            <p>Order ID: {order['id']}</p>
                            <p>Date Created: {order['created_at']}</p>
                            <p>Total Amount: {order['total']}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <OrderDetailsTable data={order['products']} />
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <TransactionsTable order={order} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;