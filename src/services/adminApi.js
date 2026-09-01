export async function fetchAdminProducts(token) {
    const response = await fetch('/api/admin/products', {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })                                                                                  ;

    if (!response.ok) {
        throw new Error('Failed to fetch products')                                     ;
    }

    return response.json()                                                              ;
}

export async function fetchAdminOrders(token) {
    const response = await fetch('/api/admin/orders', {
        headers : {
            Authorization: `Bearer ${token}`
        }
    })                                                                                  ;

    if (!response.ok) {
        throw new Error('Failed to fetch orders')                                       ;
    }

    return response.json()                                                              ;
}

export async function createAdminProduct(token, product) {
    const response = await fetch('/api/admin/products', {
        method            : 'POST'                    ,
        headers           : {
            'Content-Type': 'application/json'        ,
            Authorization : `Bearer ${token}`
        }                                             ,
        body              : JSON.stringify(product)
    })

    if (!response.ok) {
        throw new Error('Failed to create product')                                     ;
    }

    return response.json()                                                              ;
}

export async function updateAdminProduct(token, productId, stock, price) {
    const response = await fetch(`/api/admin/products/${productId}`, {
        method : 'PUT'                                ,
        headers: {
            'Content-Type': 'application/json'        ,
            Authorization : `Bearer ${token}`
        }                                             ,
        body   : JSON.stringify({stock: parseInt(stock, 10), price: parseFloat(price)})
    })

    if (!response.ok) {
        throw new Error('Failed to update product')                                     ;
    }

    return response.json()                                                              ;
}

export async function deleteAdminProduct(token, productId) {
    const response = await fetch(`/api/admin/products/${productId}`, {
        method : 'DELETE'                             ,
        headers: {
            Authorization : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error('Failed to delete product')                                     ;
    }

    return response.json()                                                              ;
}
