import { useState } from "react"                                                        ;
import { 
    fetchAdminProducts  ,
    fetchAdminOrders    ,
    createAdminProduct ,
    updateAdminProduct ,
    deleteAdminProduct
                  } from "../services/adminApi"                                         ;

export function useAdmin(token) {
    const [orders               , setOrders]                = useState([])              ;
    const [products             , setProducts]              = useState([])              ;
    const [editStock            , setEditStock]             = useState('')              ;
    const [editPrice            , setEditPrice]             = useState('')              ;
    const [editProductId        , setEditProductId]         = useState(null)            ;
    const [newProductName       , setNewProductName]        = useState('')              ;
    const [newProductPrice      , setNewProductPrice]       = useState('')              ;
    const [newProductStock      , setNewProductStock]       = useState('')              ;
    const [newProductCategory   , setNewProductCategory]    = useState('1')             ;

    const fetchProducts = async () => {
        try {
            const data = await fetchAdminProducts(token)                                ;
            setProducts(data)                                                           ;
        } catch (error) {
            console.error(error)                                                        ;
        }
    }                                                                                   ;

    const fetchOrders = async () => {
        try {
            const data = await fetchAdminOrders(token)                                  ;
            setOrders(data)                                                             ;
        } catch (error) {
            console.error(error)                                                        ;
        }
    }                                                                                   ;

    const handleEditProduct = (product) => {
        setEditProductId(product.id)                                                    ;
        setEditStock    (product.stock)                                                 ;
        setEditPrice    (product.price)                                                 ;
    }                                                                                   ;

    const handleSaveProduct = async (productId) => {
        try {
            await updateAdminProduct(
                token       ,
                productId   ,
                editStock   ,
                editPrice
            )                                                                           ;

            await fetchAdminProducts()                                                  ;

            setEditProductId(null)                                                      ;
            setEditStock    ()                                                          ;
            setEditPrice    ()                                                          ;
        }   catch (error)   {
        console.error('Error updating product:', error)                                 ;
        }
    }                                                                                   ;

    const handleAddProduct = async () => {
        if (!newProductName || !newProductPrice || !newProductStock) {
            alert('Please fill all fields')                                             ;
            return                                                                      ;
        }

        try {
            const product = {
                name      : newProductName    ,
                price     : newProductPrice   ,
                stock     : newProductStock   ,
                categoryId: newProductCategory
            }                                                                           ;

            await createAdminProduct(token, product)                                   ;
            await fetchProducts()                                                       ;

            setNewProductName    ('')                                                   ;
            setNewProductPrice   ('')                                                   ;
            setNewProductStock   ('')                                                   ;
            setNewProductCategory('')                                                   ;
        }   catch (error)   {
            console.error('Error adding product:', error)                               ;
        }
    }                                                                                   ;

    const handleDeleteProduct = async (productId) => {
        if (!confirm('Delete this product?')) return                                    ;

        try {
            await deleteAdminProduct(token, productId)                                 ;
            await fetchProducts      ()                                                 ;
        }   catch (error)   {
            console.error('Error deleting product:', error)                             ;
        }
    }                                                                                   ;

    const handleCancelEdit = () => {
        setEditProductId(null)                                                          ;
        setEditStock    ('')                                                            ;
        setEditPrice    ('')                                                            ;
    }                                                                                   ;

    return {
        products                ,
        orders                  ,
        editProductId           ,
        editStock               ,
        editPrice               ,
        newProductName          ,
        newProductPrice         ,
        newProductStock         ,
        newProductCategory      ,
        fetchProducts           ,
        fetchOrders             ,
        setProducts             ,
        setOrders               ,
        setEditProductId        ,
        setEditPrice            ,
        setEditStock            ,
        setNewProductName       ,
        setNewProductPrice      ,
        setNewProductStock      , 
        setNewProductCategory   ,
        handleEditProduct       ,
        handleSaveProduct       , 
        handleAddProduct        ,
        handleDeleteProduct     ,
        handleCancelEdit
    }                                                                                   ;
}