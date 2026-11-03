const API_URL = "http://localhost:8080/api/tasks";

export async function getTasks() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Expected an array of tasks from the backend");
    }

    return data;
}

export async function createTask(title) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            completed: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create task.`);
    }

    return response.json();
}

export async function toggleTask(id) {
    const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error(`Failed to update task.`);
    }

    return response.json();
}
