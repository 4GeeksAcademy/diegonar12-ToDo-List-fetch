import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faT, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const [userName, setUserName] = useState("diegonar12")

  const addUser = async () => {
    try{
      const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {method: 'POST'})
    } catch{
      console.error('Algo salio mal')
    }
  }

  const deleteUser = async () => {
    try{
      const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {method: 'DELETE'})
    } catch{
      console.error('Algo salio mal')
    }
    setItems('')
  }

  useEffect(() =>{
    addUser()
  }, [])


  const addItem = async () => {

    if (inputValue !== ''){
      try{
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ 'label': inputValue, 'is_done': false }),
      })
      const convert = await response.json()
      setItems([...items, convert])
      setInputValue('')
      } catch {
          console.error('Algo salio mal x2')
      }
    } else {
      alert('Debe estar lleno')
    } 
  }

  const deleteItem = async (id) => {
      const updatedItems = items.filter((item, i) => item.id !== id);
      setItems(updatedItems);
    try{
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {method: 'DELETE'})
    } catch{
      console.error('Algo salio mal')
    }
  }
 
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };


  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">To-Do List</h4>
      <div className="mb-3">
      <input
          type="text"
          className="form-control"
          placeholder="Escribe tu usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Escribe una tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button className="btn btn-success w-100 mt-2" onClick={addUser}>
          Agregar Usuario
        </button>
        <button className="btn btn-danger w-100 mt-2" onClick={deleteUser}>
          Eliminar Usuario
        </button>
        <button className="btn btn-primary w-100 mt-2" onClick={deleteUser}>
          Login 
        </button>
      </div>
      <ul className="list-group">
        {items.length === 0 ? (
          <li className="list-group-item text-center">
            No hay tareas, añadir tareas
          </li>
        ) : (
          items.map((item, index) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={index}
            >
              <div className="d-flex align-items-center">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id={`task-${index}`}
                />
                {item.label}
              </div>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-danger trash-icon"
                onClick={() => deleteItem(item.id)}
              />
            </li>
          ))
        )}
      </ul>
      <div className="text-center mt-3">
        <strong>
          {items.length} {items.length === 1 ? "tarea restante" : "tareas restantes"}
        </strong>
      </div>
    </div>
  );
};

export default TodoList;
