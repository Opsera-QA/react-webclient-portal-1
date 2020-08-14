import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import DtoItemDisplayer from "./item-displayer/dto-item-displayer";


// TODO: Rework
function DtoItemInput({ dataObject, setDataObject, fieldName }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [textInput, setTextInput] = useState("");

  const removeItem = (i) => {
    let newDataObject = dataObject;
    let newItems = dataObject.getData(fieldName);
    newItems.splice(i, 1);
    newDataObject.setData(fieldName, newItems);
    setDataObject({...newDataObject});
  };

  const addItem = () => {
    if (textInput) {
      let newDataObject = dataObject;
      let newItems = newDataObject.getData(fieldName);
      if (newItems.find(item => item.toLowerCase() === textInput.toLowerCase())) {
        return;
      }
      newItems.push(textInput);
      setTextInput("");
      newDataObject.setData(fieldName, newItems);
      setDataObject({...newDataObject});
    }
  };

  const inputKeyDown = (e) => {
    e.stopPropagation();
    const newItem = e.target.value;
    if (e.key === "Enter" && newItem) {
      if (dataObject.getData(fieldName).find(item => item.toLowerCase() === newItem.toLowerCase())) {
        return;
      }
      addItem()
      setTextInput("");
    }
  };

  // TODO: Rewrite
  return (
    field &&
    <>
      <DtoItemDisplayer fieldName={fieldName} dataObject={dataObject} removeItem={removeItem} />
      <Form.Group className="custom-text-input" controlId={field.id}>
        <Form.Label>
          {/*<span className="mt-2">{field.label}</span>*/}
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

DtoItemInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object
};

export default DtoItemInput;