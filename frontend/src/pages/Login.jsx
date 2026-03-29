import { useState } from "react";

function Login() {
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login Gagal");
                return;
            }

            localStorage.setItem("token", data.token);

            alert("Login Berhasil");
        } catch (error) {
            console.error(error);
            alert("Server Error")
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Welcome Back
                </h2>
                <p className="text-center pb-5">
                    Please enter your details to sign in.
                </p>

                <hr className="border-t border-gray-200 my-2 pb-5"/>

                <p className="pb-2">
                    Username
                </p>
                <input 
                    type="text"
                    placeholder="Enter Your Username"
                    className="w-full border p-2 mb-3 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="pb-2">
                    Password
                </p>
                <input 
                    type="password" 
                    placeholder="Enter Your Password"
                    className="w-full border p-2 mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="w-full bg-gray-800 text-white p-2 rounded">
                    Sign in
                </button>
                <p className="text-center p-5 text-xs">
                    Don't have an account yet? Sign up
                </p>
            </form>
        </div>
    );
}

export default Login;