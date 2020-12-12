import React from "react";
import PropTypes from "prop-types";

function DtoFilterTextInput({fieldName, dataObject, setDataObject, disabled, type}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  return (
    <div className="my-auto">
      <input type={type} disabled={disabled} placeholder="Search for Keywords" value={dataObject.getData(fieldName)} className="form-control"
             onChange={e => validateAndSetData(fieldName, e.target.value)}/>
    </div>
  );
}

DtoFilterTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default DtoFilterTextInput;