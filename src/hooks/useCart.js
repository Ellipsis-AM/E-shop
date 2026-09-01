import { useState } from "react"                                                                ;

export function useCart() {
    const [cart, setCart] = useState([])                                                        ;

    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id)                            ;
        if (existing) {
            updateQuantity(product.id, existing.quantity + 1)                                   ;
        }   else   {
            setCart ([...cart, { ...product, quantity: 1}])                                     ;
        }                                                                                       ;
    }                                                                                           ;

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)                                                           ;
        }   else   {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            ))                                                                                  ;
        }
    }                                                                                           ;

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId))                                   ;
    }                                                                                           ;

    const clearCart = () => {
        setCart([])                                                                             ;
    }                                                                                           ;

    return {
        cart            ,
        addToCart       ,
        updateQuantity  ,
        removeFromCart  ,
        clearCart
    }                                                                                           ;
}