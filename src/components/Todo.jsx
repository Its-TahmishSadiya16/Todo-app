

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../App.css"
import React, { useState } from 'react';

function Todo() {
  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState([]); // Assuming getLocalItem() is defined elsewhere
  const [toggleSubmit, setToggleSubmit] = useState(true);
const[isEditItem,setIsEditItem]=useState(null);




  const addItem = () => {
    if (!inputData) {
      alert('please fill data');

      } else if (inputData&&!toggleSubmit){
        setItem(
          item.map((elem)=>{
            if(elem.id===isEditItem){
              return {...elem,name:inputData};
            }
            return elem;
          })
        );
        setToggleSubmit(true);
        setInputData('');
        setIsEditItem(null);
     
      return;
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData };
      setItem([...item, allInputData]);
      setInputData('');
    }
  };

  const deleteItem = (id) => {
    const updatedItems = item.filter((elem) => elem.id !== id);
    setItem(updatedItems);
  };

  const editItem = (id) => {
    let editedItem = item.find((elem) => elem.id === id);
    console.log(editedItem);
    // Add logic for editing the item
    setToggleSubmit(false);
    setInputData(editedItem.name);
    setIsEditItem(id);
  };

  const removeAll = () => {
    setItem([]);
  };

  return (
    <div>
      <div className='main-div'>
        <div className='child-div'>
          <figcaption>Add Your List Here</figcaption>
          <div className='addItem'>
            <input
              type="text"
              placeholder='Add tasks'
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <FontAwesomeIcon icon={faPlus} onClick={addItem} />
            ) : (
              <FontAwesomeIcon icon={faEdit} onClick={addItem} />
            )}
          </div>

          <div className='showItem'>
            {item.map((elem) => (
              <div className='eachItem' key={elem.id}>
                <h3>{elem.name}</h3>
                <div className="buttonGroup">
                <FontAwesomeIcon icon={faEdit} onClick={() => editItem(elem.id)} />
                <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(elem.id)} />
              </div>
              </div>
            ))}
            <div className='showItem'>
              <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}>
                <span>REMOVE ALL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
