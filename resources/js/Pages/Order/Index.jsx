import React, { Fragment, useMemo } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Table } from "antd";

const Index = ({auth}) => {
    const { delete: destroy } = useForm({});
    const { orders, user } = usePage().props;

    function onDelete(e, id) {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete order#${id}?`)) {
            destroy(route("orders.destroy", id));
        }
    }

    const columns = [
        {
          title: 'Order Id',
          dataIndex: 'id',
          key: 'id'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
          },
          {
            title: 'Total',
            dataIndex: 'total',
            key: 'total'
          },
          {
            title: 'Date created',
            dataIndex: 'created_at',
            key: 'created_at'
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
          <>
              <Link
                    tabIndex="1"
                    className="py-2 px-2 text-sm text-black hover:underline"
                    href={route("orders.show", record.id)}
                >
                    View
                </Link>
                <Button type="link"
                    className="py-2 text-sm text-black hover:underline"
                    onClick={(e)=> onDelete(e, record.id)}
                >
                    Delete
                </Button>
          </>      
          ),
        },
      ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {user && <Fragment><Link
                        href={route("users.index")}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        Users
                    </Link>
                    <span className="font-medium"> / {user.name} / </span> 
                    </Fragment>}
                    Orders
                </h2>}
        >
            <Head title="Orders" />
        
            <div className="container mx-auto py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <div className="flex justify-between  mb-6">
                            <Link
                                className="px-6 py-2 text-white hover:text-white bg-green-500 rounded-md focus:outline-none"
                                href={route("orders.create")}
                            >
                                Create Order
                            </Link>
                        </div>
                        <Table columns={columns} dataSource={orders} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;