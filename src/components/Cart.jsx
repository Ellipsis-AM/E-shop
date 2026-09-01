function Cart ({
    cart            ,
    onUpdateQuantity,
    onRemoveFromCart,
    onCheckout      ,
    checkoutStatus
}) {
    return(
        <div className="
            w-full
            min-w-0
            rounded-lg
            border
            border-gray-200
            bg-white
            p-4
        ">
            <h2 className="text-2xl font-bold text-gray-900">
                Cart ({cart.length})
            </h2>

            {cart.map(item => (
                <div 
                    key={item.id} 
                    className="
                        flex
                        min-w-0
                        items-center
                        justify-between
                        gap-2
                        rounded-lg
                        border-b
                        border-gray-200
                        py-2
                    ">
                    <span className="flex-1 font-medium text-gray-900 text-sm min-w-0 truncate">
                        {item.name}
                    </span>

                    <input
                        className="
                            w-12
                            shrink-0
                            rounded-md
                            border
                            border-gray-300
                            px-2 py-1
                            text-center
                        "
                        type    ="number"
                        min     ="1"
                        max     ={item.stock}
                        value   ={item.quantity}
                        onChange={(event) =>
                            onUpdateQuantity(
                                item.id,
                                parseInt(event.target.value)
                            )
                        }
                    />

                    <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="
                            shrink-0
                            rounded-lg
                            bg-red-600
                            px-2 py-1
                            text-sm
                            font-medium
                            text-white
                            hover:bg-red-700
                        "
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button 
                onClick={onCheckout}
                className="
                    w-full
                    rounded-lg
                    bg-blue-600
                    px-4 py-3
                    font-semibold
                    text-white
                    hover:bg-blue-700
                "
            >
                Checkout
            </button>

            {checkoutStatus && (
                <p className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                    {checkoutStatus}
                </p>
                )}
        </div>
    )                                                                       ;
}

export default Cart                                                         ;