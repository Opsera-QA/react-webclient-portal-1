import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";

function DtoSelectInput({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, filter, placeholderText, setDataFunction, allowCreate, setSelectOptions}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    // let errorCount = dataObject.validateField(field, field);

    // console.log("ErrorCount: " + JSON.stringify(errorCount));
    // setErrorMessage(errorMessage);
    setDataObject({...newDataObject});
  };

  const handleCreate = (newValue) => {
    let currentOptions = [...selectOptions];
    currentOptions.push(newValue);
    setSelectOptions(currentOptions);
    validateAndSetData(fieldName, newValue);
  }


  return (
    field &&
        <>
          <div className="m-2">
            <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null } </span></label>
            <DropdownList
              allowCreate={allowCreate}
              onCreate={name => handleCreate(name)}
              data={selectOptions}
              valueField={valueField}
              textField={textField}
              filter={filter}
              groupBy={groupBy}
              value={dataObject.getData(fieldName)}
              placeholder={placeholderText}
              onChange={e => setDataFunction ? setDataFunction(field.id, e) : validateAndSetData(field.id, e[valueField])}
            />
            <div className="invalid-feedback">
              <div>{errorMessage}</div>
            </div>
            <small className="form-text text-muted">
              <div>{field.formText}</div>
            </small> 
          </div>
        </>
  );
}

DtoSelectInput.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  filter: PropTypes.string,
  value: PropTypes.func,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.string,
  setSelectOptions: PropTypes.func
};

DtoSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  groupBy: "groupId",
  filter: "contains",
  placeholderText: "Select One"
}

export default DtoSelectInput;