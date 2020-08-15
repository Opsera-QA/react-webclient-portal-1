import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import DtoItemDisplayer from "./dto-item-displayer";


// TODO: Rework
function DtoItemInput({dataObject, setDataObject, fieldName}) {
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
      <div className="m-2 form-group">
        <div className="custom-text-input">
          <label className="mt-2"><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
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
          {/*<div className="invalid-feedback">{errorMessage}</div>*/}
          <small className="text-muted form-text">
            <div>{field.formText}</div>
          </small>
        </div>
        <DtoItemDisplayer fieldName={fieldName} dataObject={dataObject} removeItem={removeItem}/>
      </div>
    </>
  );
}

DtoItemInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object
};

export default DtoItemInput;