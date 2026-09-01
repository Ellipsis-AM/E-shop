import { useEffect, useState } from 'react'                                                     ;
import        AdminPage        from './pages/AdminPage'                                         ;
import        LoginPage        from './pages/LoginPage'                                         ;
import        StorePage        from './pages/StorePage'                                         ;
import       RegisterPage      from './pages/RegisterPage'                                      ;
import       { useAuth }       from './hooks/useAuth'                                           ;
import       { useCart }       from './hooks/useCart'                                           ;
import { 
           getTheProducts, 
            makeTheOrders
                             } from './services/api'                                            ;

function App() {
    const [currentView   , setCurrentView]    = useState('login')                               ;
    const [products      , setProducts]       = useState([])                                    ;
    const [checkoutStatus, setCheckoutStatus] = useState(null)                                  ;

    const auth = useAuth()                                                                      ;
    const cart = useCart()                                                                      ;

    const fetchProducts = async() => {
        try {
            const data = await getTheProducts()                                                 ;
            setProducts(data)                                                                   ;
        }   catch (error)   {
            console.error('Error fetching products:', error)                                    ;
        }
    }                                                                                           ;

    useEffect(() => {
        if (auth.token && auth.user?.role !== 'admin') {
            fetchProducts()                                                                     ;
        }
    }, [auth.token, auth.user])                                                                 ;

    if (auth.authLoading) {
        return <div className="text-gray-500 bg-green-500">Loading...</div>                                                            ;
    }
    
    const handleLogout = () => {
        auth.handleLogout()                                                                     ;
        cart.clearCart()                                                                        ;
        setCurrentView('login')                                                                 ;
    }                                                                                           ;

    const checkout = async () => {
        if (cart.cart.length === 0) {
            setCheckoutStatus('Your cart is empty.')                                            ;
            return                                                                              ;
        }

        try{
            const totalAmount = cart.cart.reduce((sum, item) => 
                sum + item.price * item.quantity, 0
            )                                                                                   ;

            const order = {
                customerName   : auth.user?.name    || 'Customer'            ,
                customerEmail  : auth.user?.email   || 'customer@example.com',
                customerPhone  : auth.user?.phone   || '01234567890'         ,
                customerAddress: auth.user?.address || 'somewhere...'        ,
                items          : cart.cart.map(item => ({ 
                    product_id : item.id                                     , 
                    quantity   : item.quantity                               ,
                    price      : item.price                              
                }))                                                          ,
                totalAmount    : totalAmount
            }
        
            const orders = await makeTheOrders(auth.token, order)                               ;
            if (orders) {
                setCheckoutStatus('Order placed successfully!')                                 ;
                cart.clearCart   ()                                                             ;
            }   else   {
                setCheckoutStatus('Checkout failed')                                            ;
            }
        }   catch (error)   {
            console.error    ('Checkout error:', error)                                         ;
            setCheckoutStatus('Error during checkout')                                          ;
        }
    }                                                                                           ;
    
    return (
        <div className="max-w-7x1 mx-auto p-5">
        {!auth.token ? (
            // LOGIN / REGISTER VIEW
            currentView === 'login' ? (
                <LoginPage
                    email           ={auth.email}
                    password        ={auth.password}
                    onEmailChange   ={auth.setEmail}
                    onPasswordChange={auth.setPassword}
                    onLogin         ={auth.handleLogin}
                    onShowRegister  ={() =>
                        setCurrentView('register')
                    }
                />
            ) : (
                <RegisterPage
                    name            ={auth.name}
                    phone           ={auth.phone}
                    address         ={auth.address}
                    email           ={auth.email}
                    password        ={auth.password}
                    onNameChange    ={auth.setName}
                    onPhoneChange   ={auth.setPhone}
                    onAddressChange ={auth.setAddress}
                    onEmailChange   ={auth.setEmail}
                    onPasswordChange={auth.setPassword}
                    onRegister      ={async () => {
                        const success = await auth.handleRegister();

                        if (success) {
                            setCurrentView('login')                                             ;
                        }
                    }}
                    onShowLogin     ={() =>
                        setCurrentView('login')
                    }
                />
            )
        ) : auth.user?.role === 'admin' ? (
            // ADMIN VIEW
            <AdminPage 
                token               ={auth.token} 
                onLogout            ={handleLogout} 
            />
        ) : (
            // STORE VIEW
            <StorePage
                products            ={products}
                cart                ={cart.cart}
                onAddToCart         ={cart.addToCart}
                onUpdateQuantity    ={cart.updateQuantity}
                onRemoveFromCart    ={cart.removeFromCart}
                onCheckout          ={checkout}
                checkoutStatus      ={checkoutStatus}
                onLogout            ={handleLogout}
            />
        )}
        </div>
    )                                                                                           ;
}

export default App                                                                              ;