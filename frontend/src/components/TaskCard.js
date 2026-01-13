import { Draggable } from "@hello-pangea/dnd";

function TaskCard({ task, index }) {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    className="task-card"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="task-title">{task.title}</div>

                    {task.description && (
                        <div className="task-desc">{task.description}</div>
                    )}

                    {task.due_date && (
                        <div className="task-due">
                            Due: {task.due_date.slice(0, 10)}
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;
