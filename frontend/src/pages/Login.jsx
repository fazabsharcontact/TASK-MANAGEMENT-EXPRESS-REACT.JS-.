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
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Login
                </h2>
                <input 
                    type="text"
                    placeholder="Username"
                    className="w-full border p-2 mb-3 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full border p-2 mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="w-full bg-gray-800 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;