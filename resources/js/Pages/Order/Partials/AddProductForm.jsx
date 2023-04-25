import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';

export default function AddProductForm({ submit, products, selectedProducts=[] }) {
    const [ productOptions, setProductOptions ] = useState([]);
    const [ product, setProduct ] = useState(null);
    const [ quantity, setQuantity ] = useState(0);

    useEffect(()=>{
        const options = products.filter((item) => {
            const exist = (selectedProducts.filter((p) => p.product.id === item.id)).length;
            return !exist;
        });
        setProductOptions(options);
    }, [selectedProducts])

    const handleSubmit = (e) => {
        e.preventDefault();
        submit({ product, quantity, amount: quantity*product.price });
        setQuantity(0);
        setProduct(0);
    }

    const onProductSelect = (e) => {
        const selected = products.filter((product) => product.id === parseInt(e.target.value));
        setQuantity(1);
        setProduct(selected[0]);
    }

    return (
        <div className="pb-10">
            <div className="max-w-7xl mx-auto space-y-6">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Add Product</h2>
                </header>
                    <div className="mt-6 flex items-center">
                    <div className='mr-2'> 
                            <InputLabel htmlFor="name" value="Name" />
                            <select 
                                key="product_id" 
                                name="product_id" 
                                id="product_id" 
                                onChange={onProductSelect}>
                                <option value="">Select a product...</option>
                                {productOptions.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className='mr-2'>
                            <InputLabel htmlFor="quantity" value="Quantity" />
                            <TextInput
                                type="number"
                                min={1}
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                disabled={!product}
                            />
                        </div>
                        <div className="">
                            <PrimaryButton onClick={handleSubmit} disabled={!product && quantity === 0}>Add</PrimaryButton>
                        </div>
                    </div>
            </div>
        </div>
    );
}
