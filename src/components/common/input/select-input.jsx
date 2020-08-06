import React, { useState } from "react";
import PropTypes from "prop-types";
import validate from "../../../utils/formValidation";
import DropdownList from "react-widgets/lib/DropdownList";

function SelectInput({ field, formData, setData, groupBy, selectOptions }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);

  const validateAndSetData = (field, value) => {
    let { isValid, errorMessage } = validate(value, field);
    setIsValid(isValid);
    setErrorMessage(errorMessage);
    setData(field.id, value);
  };

  return (
    field &&
        <>
          <div className="custom-select-input form-group">
            <label><span>{field.label}{field.rules.isRequired ? <span className="danger-red">*</span> : null } </span></label>
            <DropdownList
              data={selectOptions}
              // TODO: Allow passing in valueField and textField
              valueField='value'
              textField='text'
              filter='contains'
              groupBy={groupBy}
              // TODO: Get initial value set and test when we replace one of the scenarios Todd mentioned
              defaultValue={formData[field.id]}
              placeholder="Select One"
              onChange={e => validateAndSetData(field, e.value)}
            />
            <div className="invalid-feedback">
              <div>{errorMessage}</div>
            </div>
            <small className="form-text text-muted">
              <div>{field.fieldText}</div>
            </small> 
          </div>
        </>
  );
}

SelectInput.propTypes = {
  selectOptions: PropTypes.array,
  setData: PropTypes.func,
  field: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  groupBy: PropTypes.string,
  formData: PropTypes.object
};

export default SelectInput;