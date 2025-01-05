import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [userName, setUserName] = useState("diegonarva12");

  const addUser = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${userName}`,
        { method: "POST" }
      );
      if (!response.ok) {
        console.error(`Error al crear el usuario: ${response.status}`);
        alert("No se pudo crear el usuario.");
        return;
      }
      console.log("Usuario creado correctamente");
    } catch (error) {
      console.error("Algo salió mal al agregar el usuario", error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${userName}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        console.error(`Error al eliminar usuario: ${response.status}`);
        alert("No se pudo eliminar el usuario o el usuario no existe.");
        return;
      }
      setItems([]);
      alert("Usuario eliminado correctamente.");
    } catch (error) {
      console.error("Algo salio mal al borrar el usuario", error);
    }
  };
  

  const addTask = async () => {
    if (inputValue === "") {
      alert("Debe escribir una tarea.");
      return;
    }
  
    const newTask = { label: inputValue, is_done: false };
  
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${userName}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask), 
        }
      );
  
      if (!response.ok) {
        console.error(`Error al agregar la tarea: ${response.status}`);
        alert("No se pudo agregar la tarea.");
        return;
      }
  
      setItems((prevItems) => [...prevItems, newTask]); 
      setInputValue("");
    } catch (error) {
      console.error("Algo salió mal al agregar la tarea", error);
    }
  };
  

  const deleteItem = async (index) => {
    const updatedItems = items.filter((_, i) => i !== index);

    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${userName}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedItems),
        }
      );

      if (!response.ok) {
        console.error(`Error al eliminar la tarea: ${response.status}`);
        alert("No se pudo eliminar la tarea.");
        return;
      }

      setItems(updatedItems);
    } catch (error) {
      console.error("Algo salió mal al eliminar la tarea", error);
    }
  };

  const getItems = async () => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/users/${userName}`,
        { method: "GET" }
      );

      if (!response.ok) {
        console.error(`Error al obtener tareas: ${response.status}`);
        alert("No se pudieron cargar las tareas o el usuario no existe.");
        setItems([]);
        return;
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Algo salió mal al obtener las tareas", error);
      alert("No se pudieron cargar las tareas.");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  
  // useEffect(() => {
  //     getItems();
  // }, []);

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
        <button className="btn btn-primary w-100 mt-2" onClick={getItems}>
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
                onClick={() => deleteItem(index)}
              />
            </li>
          ))
        )}
      </ul>
      <div className="text-center mt-3">
        <strong>
          {items.length}{" "}
          {items.length === 1 ? "tarea restante" : "tareas restantes"}
        </strong>
      </div>
    </div>
  );
};

export default TodoList;
