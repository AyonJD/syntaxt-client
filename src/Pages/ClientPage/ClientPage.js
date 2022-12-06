import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Utils/Urls';

const ClientPage = () => {
    const [productData, setProductData] = useState([]);

    /**
     * This function fetches the data from the API and sets the state of the product data to the parsed
     * data.
     */
    const getProductData = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/v1/product`);
            const parseData = await res.json();
            setProductData(parseData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProductData();
    }, [productData]);

    return (
        <div className='mid-container'>
            <h1 className='mb-4 text-2xl font-semibold'>{productData?.result?.length} Products found</h1>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10'>
                {
                    productData?.result?.map((product) => {
                        return (
                            <div key={product?._id} className='image_hover '>
                                <div className='overflow-hidden relative'>
                                    <img className='block w-full' src={product.image} alt="" />
                                    <div className='absolute bottom-[-270px] py-2 px-1 right-0 w-full h-full hover_div'>
                                        <p className='text-xl font-semibold text-white'>{product.label}</p>
                                        <p className='text-white font-semibold'>{product.details}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    );
};

export default ClientPage;