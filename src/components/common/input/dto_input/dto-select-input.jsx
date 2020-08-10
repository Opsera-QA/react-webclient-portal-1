import React, { useState } from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";

function DtoSelectInput({ fieldName, dataObject, setDataObject, groupBy, selectOptions }) {
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

  return (
    field &&
        <>
          <div className="custom-select-input form-group">
            <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null } </span></label>
            <DropdownList
              data={selectOptions}
              // TODO: Allow passing in valueField and textField
              valueField='value'
              textField='text'
              filter='contains'
              groupBy={groupBy}
              defaultValue={dataObject.getData(fieldName)}
              placeholder="Select One"
              onChange={e => validateAndSetData(field.id, e.value)}
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
  dataObject: PropTypes.object
};

export default DtoSelectInput;