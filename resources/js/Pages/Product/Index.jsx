import React, { useMemo } from "react";
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Table } from "antd";

const Index = ({auth}) => {
    const { products } = usePage().props;

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <a>{text}</a>,
          },
          {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text) => <a>{text}</a>,
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <Link
                    tabIndex="1"
                    className="px-4 py-2 text-sm text-black hover:underline"
                    href={route("products.edit", record.id)}
                >
                    Edit
                </Link>
          ),
        },
      ];

      const data = useMemo(()=>{
        return products.map((product) => {
            return {
                key: product.id,
                ...product
            }
        })
      })

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Products" />
        
            <div className="container mx-auto py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <div className="flex items-center justify-between mb-6">
                            <Link
                                className="px-6 py-2 text-white hover:text-white bg-green-500 rounded-md focus:outline-none"
                                href={route("products.create")}
                            >
                                Create Product
                            </Link>
                        </div>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;