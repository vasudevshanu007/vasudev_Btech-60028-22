import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import API from "../services/api";
import TaskCard from "./TaskCard";
import "../styles/kanban.css";

function KanbanBoard({ setIsAuth }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTasks = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };
    function KanbanBoard({ setIsAuth }) {

        const handleLogout = () => {
            localStorage.removeItem("token");
            setIsAuth(false);
        };

        return (
            <>
                <button onClick={handleLogout} style={{ float: "right" }}>
                    Logout
                </button>

                {/* existing kanban code */}
            </>
        );
    }


    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (!title.trim()) return;
        await API.post("/tasks", { title });
        setTitle("");
        fetchTasks();
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        await API.put(`/tasks/${result.draggableId}`, {
            status: result.destination.droppableId,
        });

        fetchTasks();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    };

    const columns = [
        { id: "pending", label: "PENDING" },
        { id: "in-progress", label: "IN-PROGRESS" },
        { id: "completed", label: "COMPLETED" },
    ];

    return (
        <div>
            {/* HEADER */}
            <div className="kanban-header">
                <h2>Kanban Board</h2>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>

            {/* ADD TASK */}
            <div className="add-task">
                <input
                    placeholder="New task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            {/* BOARD */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban-board">
                    {columns.map((col) => (
                        <Droppable droppableId={col.id} key={col.id}>
                            {(provided) => (
                                <div
                                    className={`kanban-column ${col.id}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3>{col.label}</h3>

                                    {tasks
                                        .filter((task) => task.status === col.id)
                                        .map((task, index) => (
                                            <TaskCard
                                                key={task._id}
                                                task={task}
                                                index={index}
                                            />
                                        ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

export default KanbanBoard;
