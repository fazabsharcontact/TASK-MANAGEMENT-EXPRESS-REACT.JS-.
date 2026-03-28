import { useEffect, useState } from "react";

function Dashboard() {
    const [tasks, setTasks] = useState([]);

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