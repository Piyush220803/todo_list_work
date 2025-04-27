import { useEffect, useState } from "react";
import { createTodo, getMyTodos } from "../services/api";
import { useNavigate } from "react-router-dom";

function ClientPanel() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTodos();
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await getMyTodos(token);
      setTodos(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await createTodo(text, token);
      setText("");
      fetchTodos(); // refresh todo list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Client Panel - My Todos</h1>

      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter todo"
          className="border p-2 flex-1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <div>
        {todos.length === 0 ? (
          <p>No todos found!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo._id} className="border p-2 rounded">
                {todo.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ClientPanel;
