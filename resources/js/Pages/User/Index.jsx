import React, { useMemo } from "react";
import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Table } from "antd";

const Index = ({auth}) => {
    const { users } = usePage().props;

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email'
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
              <Link
                    tabIndex="1"
                    className="py-2 text-sm text-black hover:underline"
                    href={route("users.orders", record.id)}
                >
                    View Orders
                </Link>
          ),
        },
      ];

      const data = useMemo(()=>{
        return users.map((user) => {
            return {
                key: user.id,
                ...user
            }
        })
      })

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />
        
            <div className="container mx-auto py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-10">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;