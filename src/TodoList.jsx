import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (inputValue !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
      return;
    }

    alert("Debe estar lleno");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">To-Do List</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe una tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleEnter}
        />
        <button className="btn btn-primary w-100 mt-2" onClick={addItem}>
          Agregar
        </button>
      </div>
      <ul className="list-group">
        {items.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between" key={index}>
          <div className="d-flex align-items-center">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            {item}
          </div>
          <FontAwesomeIcon
            icon={faTrash}
            className="text-danger"
            onClick={() => removeItem(index)}
          />
        </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
