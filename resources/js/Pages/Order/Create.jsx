import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import ProductTable from "./Partials/AddProductTable";
import AddProductForm from "./Partials/AddProductForm";
import SelectUserForm from "./Partials/SelectUserForm";
const Create = ({auth}) => {
    const { products, users } = usePage().props;
    const {data, setData, errors, processing, post, get} = useForm({
        user_id: '',
        products: [],
        total_amount: 0
    });
    const [state, setState] = useState({
        user_id: '',
        products: []
    });

    const totalAmount = parseFloat(state.products?.reduce((total, item) => total+item.amount, 0)).toFixed(2);

    useEffect(() => {
        setData(()=> ({...state, total_amount: totalAmount}));
    }, [state])
   
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("orders.store"));
    }

    const onCancel = (e) => {
        e.preventDefault();
        get(route("orders.index"));
    }

    const handleUserChange = (e) => {
        setState((prev) => {
            return {
                ...prev,
                user_id: parseInt(e.target.value)
            }
        });
    }
    
    const handleQuantityChange = (e, product) => {
    setState((prev) => {
        const productIndex = prev.products.findIndex((item) => item.product.id === product.id);
        prev.products[productIndex].quantity = parseInt(e.target.value);
        prev.products[productIndex].amount = product.price*e.target.value;
        return {
            ...prev,
            products: prev.products
        }
    })
    };

    const handleRemoveProduct = (e, index) => {
        e.preventDefault();
        state.products.splice(index, 1);
        setState((prev) => {
            return {
                ...prev,
                products: prev.products.splice(index, 1)
            }
        })
    }

    const handleAddProduct = (product) => {
    setState((prev) => {
        return {
            ...prev,
            products: [...prev.products, product]
        }
    })
    }

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
                    Create
                </h2>}
            >
            <Head title="Order" ></Head>

            <div className="py-12">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
                </header>
                    <form onSubmit={handleSubmit}>
                        <div className="py-5">
                            <SelectUserForm users={users} handleUserChange={handleUserChange}/>
                        </div>
                        <div className="py-5">
                            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                                <AddProductForm products={products} selectedProducts={state.products} submit={handleAddProduct}/>
                                <ProductTable data={state.products} handleQuantityChange={handleQuantityChange} handleRemoveProduct={handleRemoveProduct}/>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span>Total Amount: {totalAmount}</span>
                            <PrimaryButton disabled={processing || !state.user_id || !state.products.length} type="submit">Save</PrimaryButton>
                            <SecondaryButton disabled={processing} onClick={onCancel}>Cancel</SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
    );
};

export default Create;