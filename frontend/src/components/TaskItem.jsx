function TaskItem({ task, onToggle }) {
    return (
        <button
            type="button"
            className={`toggle-switch ${task.completed ? "active" : ""}`}
            onClick={() => onToggle(task.id)}
            role="switch"
            aria-checked={task.completed}
            aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
        >
            <span className="toggle-knob"></span>
        </button>
    );
}

export default TaskItem;