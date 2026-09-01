function ProductCard({ product, onAddToCart }) {
    const isOutOfStock = product.stock === 0                        ;

    return (
        <div className="bg-white rounded-xl shadow-lg flex flex-col p-5">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <p className="text-gray-700">Price: {product.price}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>

                {isOutOfStock ? (
                    <p className="text-red-600">Out of Stock</p>
                ) : (
                    <button 
                        onClick={() => onAddToCart(product)}
                        className="
                            cursor-pointer
                            rounded-lg
                            bg-green-600
                            px-3.5
                            py-3
                            font-medium
                            text-white
                            hover:bg-green-700
                            disabled:cursor-not-allowed
                            disabled:bg-slate-400
                        "
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    )                                                               ;
}

export default ProductCard                                          ;