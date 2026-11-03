import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle }) {
    return (
        <div className="task-table-container">
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Completion Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan="2">
                                No tasks available. Add your first task!
                            </td>
                        </tr>
                    ) : (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td className={task.completed ? "task-completed" : ""}>
                                    {task.title}
                                </td>
                                <td className="status-cell">
                                    <TaskItem
                                        task={task}
                                        onToggle={onToggle}
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;