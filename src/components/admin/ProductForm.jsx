function ProductForm ({
    name            ,
    price           ,
    stock           ,
    category        ,
    onNameChange    ,
    onPriceChange   ,
    onStockChange   ,
    onCategoryChange,
    onSubmit
}) {
    return(
        <div className="flex flex-col gap-3">
            <input
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-gray-900
                    focus:border-green-500
                    focus:outline-none
                "
                type            ="text"
                placeholder     ="Product Name"
                value           ={name}
                onChange        ={(event) => 
                    onNameChange(event.target.value)
                }
            />
            <input
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-gray-900
                    focus:border-green-500
                    focus:outline-none
                "
                type        ="number"
                step        ="0.01"
                placeholder ="Price"
                value       ={price}
                onChange    ={(event) => 
                    onPriceChange(event.target.value)
                }
            />
            <input
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-gray-900
                    focus:border-green-500
                    focus:outline-none
                "
                type        ="number"
                placeholder ="Stock"
                value       ={stock}
                onChange    ={(event) => 
                    onStockChange(event.target.value)
                }
            />
            <select
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2
                    text-gray-900
                    focus:border-green-500
                    focus:outline-none
                " 
                value       ={category} 
                onChange    ={(event) => 
                    onCategoryChange(event.target.value)
                }
            >
            <option value="1">Jar</option>
            <option value="2">Food</option>
            </select>
            <button 
                onClick={onSubmit}
                className="
                    w-full
                    rounded-lg
                    bg-green-600
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-white
                    hover:bg-green-700
                "
            >Add Product
            </button>
        </div>
    )                                                                               ;
}

export default ProductForm                                                          ;