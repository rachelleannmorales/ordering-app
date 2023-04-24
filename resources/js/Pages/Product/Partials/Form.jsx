import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function ProductForm({ submit, product=null }) {
    const { data, setData, put, errors, processing, delete: destroy, get, post } = useForm({
        name: product?.name || "",
        description: product?.description || "",
        quantity: product?.quantity || "",
        price: product?.price || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        submit({post, put});
    }

    function onCancel(e) {
        e.preventDefault();
        get(route("products.index"));
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Product Information</h2>
                </header>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                            />
                            </div>
                            <InputError className="mt-2" message={errors.name} />
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <TextInput
                                id="description"
                                className="mt-1 block w-full"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />
                            <InputError className="mt-2" message={errors.description} />
                            </div>
                        <div>
                            <InputLabel htmlFor="price" value="Price" />
                            <TextInput
                                id="price"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                required
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.price} />
                            </div>
                        <div>
                            <InputLabel htmlFor="quantity" value="Quantity" />
                            <TextInput
                                id="quantity"
                                className="mt-1 block w-full"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                                required
                                type="number"
                            />
                            <InputError className="mt-2" message={errors.quantity} />
                        </div>
                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Save</PrimaryButton>
                            <SecondaryButton disabled={processing} onClick={onCancel}>Cancel</SecondaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
