function LoginPage({
    email           ,
    password        ,
    onEmailChange   ,
    onPasswordChange,
    onLogin         ,
    onShowRegister
}) {
    return (
        <div className="flex flex-col gap-3 mx-auto w-full max-w-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Login</h2>

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
                onClick={onLogin}
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
                Login
            </button>

            <p className="text-gray-500">
                Don&apos;t have an account? {' '}
                <button 
                    onClick={onShowRegister}
                    className="text-blue-500"
                >
                    Register
                </button>
            </p>
        </div>
    )                                                                               ;
}

export default LoginPage                                                            ;