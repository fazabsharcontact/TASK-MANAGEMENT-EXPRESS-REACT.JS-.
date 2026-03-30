import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Dashboard
            </h1>

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