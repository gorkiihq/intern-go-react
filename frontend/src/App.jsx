import './App.css'

import { useEffect, useState } from "react";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

import {
    getTasks,
    createTask,
    toggleTask,
} from "./services/taskService";

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadTasks() {
            try {
                const data = await getTasks();
                setTasks(data);
                setError("");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadTasks();
    }, []);

    const handleAddTask = async (title) => {
        try {
            const newTask = await createTask(title);
            setTasks((prev) => [...prev, newTask]);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleTask = async (id) => {
      const previousTasks = tasks;

      setTasks((prev) =>
          prev.map((task) =>
              task.id === id
                  ? { ...task, completed: !task.completed }
                  : task
          )
      );

      try {
          await toggleTask(id);
          setError("");
      } catch (err) {
          setTasks(previousTasks);
          setError(err.message);
      }
  };

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div className="app">
            <h1>Real-Time Task Tracker</h1>

            {error && <p className="error">{error}</p>}

            <AddTask onAddTask={handleAddTask} />

            <TaskList
                tasks={tasks}
                onToggle={handleToggleTask}
            />
        </div>
    );
}

export default App;