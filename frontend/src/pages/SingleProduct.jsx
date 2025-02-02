import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchProductQuery, useFetchProductsQuery } from '../store';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const SingleProduct = () => {
    // getting the product id using params
    const { id } = useParams();

    // getting token from local storage for the purpose of authentication
    const token = localStorage.getItem('token');

    //accessing single product details using redux toolkit query from store
    const {data, error, isFetching} = useFetchProductQuery(id);

    // initializing state variables that will be modified by users 
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(data?.regularPrice);

    // handling quantity change while the users wanted to purchase more product
    const handleQuantity = (e) => {
        const value = Math.max(1, e.target.value);
        setQuantity(value);

        // setting total price
        setTotalPrice(data?.regularPrice * quantity);
    }

    // handling product size change while the users wanted to purchase different sizes
    const handleProductSizeChange = (e) => {
        const value = e.target.value;
        switch(value) {
            case 'one-gram':
                setTotalPrice(data?.regularPrice * quantity);
                break;
            case 'one-half-gram':
                setTotalPrice(data?.regularPrice * 1.5 * quantity);
                break;
            case 'three-gram':
                setTotalPrice(data?.regularPrice * 3 * quantity);
                break;
            case 'ten-gram':
                setTotalPrice(data?.regularPrice * 10 * quantity);
                break;
            case 'fifteen-gram':
                setTotalPrice(data?.regularPrice * 15 * quantity);
                break;
            case 'twenty-gram':
                setTotalPrice(data?.regularPrice * 20 * quantity);
                break;
            default:
                break;
        }
    }

    // when user wants to order, then we handle the order here
    const addNewOrder = async(e) => {
        e.preventDefault();

        // check whether the user is logged in or not
        if (!token) {
            toast.error("please login before placing order");
        }
        // order data to be stored to database using axios
        const orderData = {
            productId: id,
            quantity, 
            totalPrice,
        }

        //
        try {
            const res = await axios.post(`${backendUrl}/orders/create`, orderData, {headers: {Authorization: `Bearer ${token}`}});
            toast.success(res.data.msg);
        } catch(error) {
            console.error(error);
            toast.error("Failed to place the order");
        } finally {

        }
    }
  return (
    <div className="p-4 mt-20">
        <div className="flex flex-col sm:flex-row gap-16 mx-20">
            {/* Product Images */}
            <div className="flex-1">
                <div className="flex gap-2 mb-4">
                    <div className="flex flex-col gap-2">
                    {data?.images.map((img, index) => (
                        <img
                        key={index}
                        src={img}
                        alt={`Product thumbnail ${index}`}
                        className="w-28 h-28 object-cover cursor-pointer border border-gray-300 rounded"
                        onClick={() => setImage(img)}
                        />
                    ))}
                    </div>
                    <div className="flex-1">
                    <img
                        src={image || data?.images[0]}
                        alt="Main product"
                        className="w-full h-[70vh] object-cover rounded-md"
                    />
                    </div>
                </div>
            </div>

            {/* Product Information */}
            <div className="flex-1">
                <h1 className="text-2xl font-semibold mb-2">{data?.productName}</h1>
                
                <div className="flex items-center text-yellow-500">
                    {[...Array(4)].map((_, index) => <FaStar key={index} />)}
                    <FaStarHalfAlt />
                    <span className="text-gray-600 pl-2">(150 reviews)</span>
                </div>

                <p className="text-4xl font-semibold mt-4">${data?.regularPrice ? (data.regularPrice * quantity).toFixed(2) : "Loading..."}</p>

                <p className="mt-4 text-gray-700">{data?.description}</p>

                <div className="mt-6">
                    <label className="block text-gray-700 font-semibold">Product Size</label>
                    <select
                    onChange = { handleProductSizeChange }
                    className="w-full mt-2 p-3 bg-gray-100 rounded-md border border-gray-300"
                    required
                    >
                    <option value="one-gram">1 gr Glass Jar</option>
                    <option value="one-half-gram">1.5 gr Glass Jar</option>
                    <option value="three-gram">3 gr Glass Jar</option>
                    <option value="ten-gram">10 gr Metal Box</option>
                    <option value="fifteen-gram">15 gr Metal Box</option>
                    <option value="twenty-gram">20 gr Metal Box</option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700 font-semibold">Quantity</label>
                    <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantity}
                    min="1"
                    className="w-full mt-2 p-3 bg-gray-100 rounded-md border border-gray-300"
                    />
                </div>

                <button
                    onClick={addNewOrder}
                    className={`w-full mt-6 p-3 bg-red-600 text-white rounded-md transition-all hover:bg-red-500`}
                >
                    Add To Cart
                </button>

                <div className="mt-6 text-gray-600">
                    <p>100% Original Product</p>
                    <p>Cash on Delivery Available</p>
                    <p>Easy return and exchange within 7 days</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleProduct