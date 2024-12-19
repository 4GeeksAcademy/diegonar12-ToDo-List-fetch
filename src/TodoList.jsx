import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './styles.css'

const TodoList = () => {

  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([])

  const addItem = () => {

    if (inputValue !== '') {
      setItems([...items, inputValue])
      setInputValue('')
      return
    }

    alert('Debe estar lleno')
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }

  const removeItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} />
      <h3>ToDo :</h3>
      <ul className="list-group">
        {
          items.map((item, index) => {
            return <li className="d-flex list-group-item justify-content-between" key={index}>{item}<FontAwesomeIcon
              icon={faTrash}
              onClick={() => removeItem(index)}
            /></li>
          })
        }
      </ul>
      <div className="list-left-box">{`${items.length} left`}</div>
    </div>
  );
};

export default TodoList;

