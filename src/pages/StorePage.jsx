import ProductList from "../components/ProductList"             ;
import    Cart     from "../components/Cart"                    ;

function StorePage ({
    products        ,
    cart            ,
    onAddToCart     ,
    onUpdateQuantity,
    onRemoveFromCart,
    onCheckout      ,
    checkoutStatus  ,
    onLogout
}) {
    return (
        <div className="grid grid-cols-1">
            <header 
                className="
                    mb-6
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    bg-white
                    p-5
                    shadow-sm
                "
            >
                <h1 className="text-2xl font-bold text-gray-900">Store</h1>
                <button 
                    onClick={onLogout}
                    className="
                        rounded-lg
                        bg-red-600
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-red-700
                    "
                    >
                        Logout
                    </button>
            </header>

            <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_250px] gap-5">
                <ProductList
                    products        ={products}
                    onAddToCart     ={onAddToCart}
                />

                <Cart
                    cart            ={cart}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveFromCart={onRemoveFromCart}
                    onCheckout      ={onCheckout}
                    checkoutStatus  ={checkoutStatus}
                />
            </div>
        </div>
    )                                                           ;
}

export default StorePage                                        ;