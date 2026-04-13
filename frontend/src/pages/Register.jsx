import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Register Gagal");
                return;
            }

            alert("Register Berhasil, silahkan login");
            navigate("/");
        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg-1.jpeg')" }}>
            <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Create Account
                </h2>
                <p className="text-center pb-5">
                    Please fill in the details to register.
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
                    Sign up
                </button>
                <p className="text-center p-5 text-xs">
                    Already have an account? {""}
                    <span 
                        onClick={() => navigate("/")}
                        className="cursor-pointer underline">
                            Sign in
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;