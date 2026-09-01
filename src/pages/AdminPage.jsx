import { useEffect } from  'react'                                                      ;
import  OrdersTable  from  '../components/admin/OrdersTable'                            ;
import  ProductForm  from  '../components/admin/ProductForm'                            ;
import ProductTables from  '../components/admin/ProductTables'                          ;
import { useAdmin }  from  '../hooks/useAdmin'                                          ;

function AdminPage({ token, onLogout }) {

    const admin = useAdmin(token)                                                       ;

    useEffect(() => {
        admin.fetchOrders  ()                                                           ;
        admin.fetchProducts()                                                           ;
    }, [token])                                                                         ;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
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
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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

        <div className="flex flex-col gap-6">
            {/* Orders Section */}
            <section 
                className="
                    rounded-xl
                    bg-white
                    p-5
                    shadow-sm
                "
            >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Orders</h2>
            <OrdersTable 
                orders          ={admin.orders}
            />
            </section>

            {/* Add Product Section */}
            <section 
                className="
                    rounded-xl
                    bg-white
                    p-5
                    shadow-sm
                "
            >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Add New Product</h2>
            <ProductForm
                name            ={admin.newProductName}
                price           ={admin.newProductPrice}
                stock           ={admin.newProductStock}
                category        ={admin.newProductCategory}
                onNameChange    ={admin.setNewProductName}
                onPriceChange   ={admin.setNewProductPrice}
                onStockChange   ={admin.setNewProductStock}
                onCategoryChange={admin.setNewProductCategory}
                onSubmit        ={admin.handleAddProduct}
            />
            </section>

            {/* Products Section */}
            <section 
                className="
                    rounded-xl
                    bg-white
                    p-5
                    shadow-sm
                "
            >
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Products</h2>
            <ProductTables
                products        ={admin.products}
                editProductId   ={admin.editProductId}
                editStock       ={admin.editStock}
                editPrice       ={admin.editPrice}
                onEdit          ={admin.handleEditProduct}
                onSave          ={admin.handleSaveProduct}
                onDelete        ={admin.handleDeleteProduct}
                onCancel        ={admin.handleCancelEdit}
                onStockChange   ={admin.setEditStock}
                onPriceChange   ={admin.setEditPrice}
            />
            </section>
        </div>
        </div>
    )                                                                                   ;
}

export default AdminPage                                                                ;