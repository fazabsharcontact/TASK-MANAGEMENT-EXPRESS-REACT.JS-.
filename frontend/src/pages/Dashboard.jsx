import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/");
                    return;
                }

                const response = await fetch("http://localhost:3000/api/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    alert(data.message || "gagal ambil data");
                    return;
                }

                setTasks(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Gagal tambah task");
                return;
            }

            setTasks([...tasks, data]);

            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Dashboard
            </h1>

            <form onSubmit={handleAddTask} className="mb-4">
                <input 
                    type="text"
                    placeholder="Add Task..."
                    className="border p-2 mr-2 rounded w-64"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add
                </button>
            </form>

            {tasks.length === 0 ? (
                <p>Tidak ada task</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className="border p-2 mb-2 rounded">
                            {task.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dashboard;