import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  // Fetch todos when page loads
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!text.trim()) return;
    const res = await axios.post('http://localhost:5000/api/todos', { text });
    setTodos([...todos, res.data]);
    setText('');
  };

  // Delete todo
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📝 Achyuth's Todo App</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.text} 
            <button onClick={() => handleDelete(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
