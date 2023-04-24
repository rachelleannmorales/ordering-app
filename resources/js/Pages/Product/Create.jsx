import { Link } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductForm from "./Partials/Form";

const Create = ({auth}) => {

    function handleSubmit(form) {
        form.post(route("products.store"));
    }

    return (
        <AuthenticatedLayout
                    user={auth.user}
                    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        <Link
                            href={route("products.index")}
                            className="text-gray-500 hover:text-gray-800"
                        >
                            Products
                        </Link>
                        <span className="font-medium"> / </span>
                        Create
                    </h2>}
                >
            <Head title="Product" ></Head>

            <ProductForm submit={handleSubmit} />
        </AuthenticatedLayout>
    );
};

export default Create;