import ProductCard from "./ProductCard"                     ;

function ProductList ({ products, onAddToCart }) {
    return (
        <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5 
            ">
            {products.map(product => (
                <ProductCard
                    key         = {product.id}
                    product     = {product}
                    onAddToCart = {onAddToCart}
                />
            ))}
        </div>
    )                                                       ;
}

export default ProductList                                  ;