import { useEffect, useState } from "react";
import { getAllTodosAdmin } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchTodos();
    }
  }, [page]);

  const fetchTodos = async () => {
    try {
      const res = await getAllTodosAdmin(token, page);
      setTodos(res.todos);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel - All Client Todos
      </h1>

      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo._id} className="border p-4 rounded">
            <p className="font-semibold">{todo.text}</p>
            <p className="text-sm text-gray-600">
              Created by: {todo.userId?.name} ({todo.userId?.email})
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
