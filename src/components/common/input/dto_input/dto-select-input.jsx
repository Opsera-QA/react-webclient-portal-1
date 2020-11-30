import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";

// TODO: Refactor into multiple components (selectInput, multiselectInput, multiselectWithCreate?)
function DtoSelectInput({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, filter, placeholderText, setDataFunction, allowCreate, setSelectOptions, valueFormatter, busy, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
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
          <div className="custom-select-input m-2">
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
              valueComponent={valueFormatter}
              busy={busy}
              placeholder={placeholderText}
              onChange={data => setDataFunction ? setDataFunction(fieldName, data) : validateAndSetData(fieldName, data[valueField])}
              disabled={disabled}
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
  selectOptions: PropTypes.array.isRequired,
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
  setSelectOptions: PropTypes.func,
  valueFormatter: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.bool
};

DtoSelectInput.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One"
}

export default DtoSelectInput;