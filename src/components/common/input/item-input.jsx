import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


// TODO: Rework
function ItemInput({ field, setData, formData }) {
  const [items, setItems] = useState(formData[field.id]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    setData(field.id, items);
  }, [items]);

  const removeItem = (i) => {
    items.splice(i, 1);
    setItems([...items]);
  };

  const addItem = () => {
    if (textInput) {
      if (items.find(item => item.toLowerCase() === textInput.toLowerCase())) {
        return;
      }
      setItems([...items, textInput]);
      setData(items);
      setTextInput("");
    }
  };

  const inputKeyDown = (e) => {
    e.stopPropagation();
    const newItem = e.target.value;
    if (e.key === "Enter" && newItem) {
      if (items.find(item => item.toLowerCase() === newItem.toLowerCase())) {
        return;
      }
      setItems([...items, newItem]);
      setTextInput("");
    } else if (e.key === "Backspace" && !newItem) {
      removeItem(newItem.length - 1);
    }
  };

  // TODO: Create its own className and styling
  return (
    field &&
    <>
      <Form.Group className="custom-text-input" controlId={field.id + "-items"}>
        <Form.Label>
          {/*<span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null} </span>*/}
        </Form.Label>
        <div className="custom-item-input">
          {items.map((item, i) => (
            <Button key={item} variant="outline-secondary" className="mr-2" size="sm">
              {item}
              <span className="ml-2" onClick={() => {
                removeItem(i);
              }}><FontAwesomeIcon icon={faTimes} fixedWidth/></span>
            </Button>
          ))}
        </div>
      </Form.Group>
      <Form.Group className="custom-text-input" controlId={field.id}>
        <Form.Label>
          <span className="mt-2">{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null} </span>
        </Form.Label>
        <InputGroup className="custom-item-input">
          <FormControl
            placeholder="Add item and press enter"
            value={textInput}
            tabIndex="0"
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={inputKeyDown}
          />
          <Button variant="primary" size="sm" onClick={addItem} className="ml-3"><FontAwesomeIcon
            icon={faPlus}/></Button>
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {/*<div>{errorMessage}</div>*/}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          <div>{field.fieldText}</div>
        </Form.Text>
      </Form.Group>
    </>
  );
}

ItemInput.propTypes = {
  setData: PropTypes.func,
  field: PropTypes.object,
  formData: PropTypes.object
};

export default ItemInput;