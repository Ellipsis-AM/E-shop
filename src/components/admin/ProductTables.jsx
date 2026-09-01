function ProductTables ({
    products        ,
    editProductId   ,
    editStock       ,
    editPrice       ,
    onEdit          ,
    onSave          ,
    onDelete        ,
    onCancel        ,
    onStockChange   ,
    onPriceChange
}) {
    return(
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                    <tr key={product.id} className="hover:bg-green-50">
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{product.id}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">{product.name}</td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">
                            {editProductId === product.id ? (
                            <input
                                className="
                                w-24
                                rounded-md
                                border
                                border-gray-300
                                px-2
                                py-1
                                "
                                type    ="number"
                                step    ="0.01"
                                value   ={editPrice}
                                onChange={(event) => onPriceChange(event.target.value)}
                            />
                            ) : (
                            `$${product.price}`
                            )}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">
                            {editProductId === product.id ? (
                            <input
                                className="
                                w-20
                                rounded-md
                                border
                                border-gray-300
                                px-2
                                py-1
                                "
                                type    ="number"
                                value   ={editStock}
                                onChange={(event) => onStockChange(event.target.value)}
                            />
                            ) : (
                            product.stock
                            )}
                        </td>
                        <td className="border-b px-4 py-3 text-sm text-gray-700">
                            {editProductId === product.id ? (
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => onSave(product.id)}
                                        className="
                                            rounded-lg
                                            bg-green-600
                                            px-3
                                            py-2
                                            text-sm
                                            font-medium
                                            text-white
                                            hover:bg-green-700
                                        "
                                    >Save
                                    </button>
                                    <button 
                                        onClick={onCancel}
                                        className="
                                            rounded-lg
                                            bg-gray-600
                                            px-3
                                            py-2
                                            text-sm
                                            font-medium
                                            text-white
                                            hover:bg-gray-700
                                        "
                                    >Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => onEdit(product)}
                                        className="
                                            rounded-lg
                                            bg-blue-600
                                            px-3
                                            py-2
                                            text-sm
                                            font-medium
                                            text-white
                                            hover:bg-blue-700
                                        "
                                    >Edit
                                    </button>
                                    <button 
                                        onClick={() => onDelete(product.id)}
                                        className="
                                            rounded-lg
                                            bg-red-600
                                            px-3
                                            py-2
                                            text-sm
                                            font-medium
                                            text-white
                                            hover:bg-red-700
                                        "
                                    >Delete
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>    
    )                                                                                           ;
}

export default ProductTables                                                                    ;