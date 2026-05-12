import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconTrash, IconCirclePlus } from "@tabler/icons-react"

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
            console.log("status: ", response.status);
            console.log("response: ", data);

            if (!response.ok) {
                alert(data.message || "Gagal tambah task");
                return;
            }

            setTasks([...tasks, { id: data.data.id, title }]);

            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Gagal hapus tasks");
                return;
            }

            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg-2.jpeg')" }}>
            <div className="flex justify-center items-center gap-[500px] py-7">
                <h1 className="text-3xl font-bold mb-4">
                    meNotes
                </h1>

                <form onSubmit={handleAddTask} className="items-center flex">
                    <input 
                        type="text"
                        placeholder="Add Task..."
                        className="border p-2 mr-2 rounded-full w-64"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button className="text-gray-800">
                        <IconCirclePlus size={27} />
                    </button>
                </form>
            </div>

            {tasks.length === 0 ? (
                <p className="text-center p-[300px] text-xl font-bold">Tidak ada task</p>
            ) : (
                <div className="grid grid-cols-3 gap-2 px-[100px]">
                    {tasks.map((task) => (
                        <div key={task.id} className="items-start p-2 mb-2 rounded-xl flex justify-between bg-white h-[200px]">

                            <span className="px-5 py-2">
                                {task.title}
                            </span>

                            <button 
                                onClick={() => handleDelete(task.id)} 
                                className="bg-gray-800 text-white px-1 py-1 rounded-full mt-[150px]"
                            >
                                <IconTrash size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;