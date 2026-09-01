function RegisterPage({
    name            ,
    phone           ,
    address         ,
    email           ,
    password        ,
    onNameChange    ,
    onPhoneChange   ,
    onAddressChange ,
    onEmailChange   ,
    onPasswordChange,
    onRegister      ,
    onShowLogin
}) {
    return(
        <div className="flex flex-col gap-3 mx-auto w-full max-w-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Register</h2>
            <input
                className   ="
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
                type        ="text"
                placeholder ="Name"
                value       ={name}
                onChange    ={(event) => 
                    onNameChange(event.target.value)
                }
            />
            <input
                className   ="
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
                type        ="tel"
                placeholder ="Phone"
                value       ={phone}
                onChange    ={(event) => 
                    onPhoneChange(event.target.value)
                }
            />
            <input
                className   ="
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
                type        ="text"
                placeholder ="Address"
                value       ={address}
                onChange    ={(event) => 
                    onAddressChange(event.target.value)
                }
            />
            <input
                className   ="
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
                type        ="email"
                placeholder ="Email"
                value       ={email}
                onChange    ={(event) => 
                    onEmailChange(event.target.value)
                }
            />
            <input
                className   ="
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
                type        ="password"
                placeholder ="Password"
                value       ={password}
                onChange    ={(event) => 
                    onPasswordChange(event.target.value)
                }
            />
            <button 
                onClick={onRegister}
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
            >
                Register
            </button>
            <p className="text-gray-500">
                Already have an account?{' '}
                <button 
                    onClick={onShowLogin}
                    className="text-blue-500"
                >
                    Login
                </button>
            </p>
        </div>            
    )                                                                                   ;
}

export default RegisterPage                                                             ;