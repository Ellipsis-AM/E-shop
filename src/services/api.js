export async function getCurrentUser(token) {
    const response = await fetch('/api/me', {
        method  : 'GET',
        headers : {
            Authorization : `Bearer ${token}`
        }
    })                                                                                  ;

    if (!response.ok) {
        throw new Error('Failed to find user')                                          ;
    }

    return response.json()                                                              ;
}

export async function userLogin(email, password) {
    const response = await fetch('/api/login', {
        method  : 'POST'                                            ,
        headers : { 'Content-Type': 'application/json' }            ,
        body    : JSON.stringify({ email, password })
    })                                                                                  ;
    
    if (!response.ok) {
        throw new Error('Failed to login user')                                         ;
    }

    return response.json()                                                              ;
}

export async function userRegister(userData) {
    const response = await fetch('/api/register', {
        method  : 'POST'                                            ,
        headers : { 'Content-Type': 'application/json' }            ,
        body    : JSON.stringify(userData)
    })                                                                                  ;
    
    if (!response.ok) {
        throw new Error('Failed to register user')                                      ;
    }

    return response.json()                                                              ;
}

export async function getTheProducts() {
    const response = await fetch('/api/products')                                       ;

    if (!response.ok) {
        throw new Error('Failed to fetch products')                                     ;
    }

    return response.json()                                                              ;
}

export async function makeTheOrders(token, order) {
    const response = await fetch('/api/orders', {
        method  : 'POST'                                            ,
        headers : { 
            'Content-Type': 'application/json'                      ,
            Authorization : `Bearer ${token}`
        }                                                           ,
        body    : JSON.stringify(order)    
    })                                                                                  ;

    if (!response.ok) {
        throw new Error('Failed to create order')                                       ;
    }

    return response.json()                                                              ;
}