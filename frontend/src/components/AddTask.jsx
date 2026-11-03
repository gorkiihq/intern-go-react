import { useState } from "react";

function AddTask({ onAddTask }){
    const [title, setTitle] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!title.trim()) return;

        await onAddTask(title);
        setTitle("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                type = "text"
                placeholder="Enter title"
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type = "submit">Add Task</button>
        </form>
    )
}

export default AddTask;