import React from 'react'
import { NavLink } from 'react-router-dom';

const ProductListItem = ({ product }) => {
  return (
    <div className="group relative border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
        <NavLink to={`/products/${product._id}`}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
                <img
                    src={product.images[0]}
                    alt="Product Image"
                    className="h-96 w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {product.productName}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    {product.productFeature}
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">${product.regularPrice}</p>
            </div>
        </NavLink>
    </div>
  )
}

export default ProductListItem