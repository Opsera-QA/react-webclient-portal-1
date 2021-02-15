import React from "react";
import PropTypes from "prop-types";

function RadioButtonOption({ fieldName, dataObject, setDataObject, value, setDataFunction, className, label, disabled}) {
  const validateAndSetData = (fieldName, value) => {
    if (setDataFunction) {
      setDataFunction(fieldName, value)
    }
    else {
      let newDataObject = dataObject;
      newDataObject.setData(fieldName, value);
      setDataObject({...newDataObject});
    }
  };

  return (
    <div className={className}>
      <div className="d-flex">
        <input
          className="mr-2 mt-1"
          type={"radio"}
          value={value}
          checked={dataObject?.getData(fieldName) === value}
          onChange={(event) => validateAndSetData(fieldName, event.target.value)}
          disabled={disabled}
        />
        <div>
          {label}
        </div>
      </div>
    </div>
  );
}

RadioButtonOption.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string
};

RadioButtonOption.defaultProps = {
  className: "my-2"
};

export default RadioButtonOption;