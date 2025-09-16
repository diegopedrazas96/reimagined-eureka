import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  const API = "http:localhost:4000";

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchTasks = useCallback(async () => {
    const result = await fetch(API + "/tasks");

    if (result.ok) {
      const data = result.json();
      setTasks(data);
    }

    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <h1> SOMETHING</h1>

      {!isLoading &&
        tasks.map((task) => {
          <h1>{task.name}</h1>;
        })}
    </>
  );
}
export default App;
