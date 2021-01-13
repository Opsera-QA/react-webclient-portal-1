import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/form_fields/input/InputLabel";
import InfoText from "components/common/form_fields/input/InfoText";

// TODO: I made this its own component in case we want to do specific styling,
//  but if not just use new text component when implemented
function WebsitePathInput({ fieldName, dataObject, setDataObject, disabled }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    value = value.toLowerCase();
    newDataObject.setData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  // TODO: When V2 of dto text input is implemented, put here
  return (
    <div className="form-group m-2">
      <InputLabel field={field}/>
      <input
        disabled={disabled}
        type="text"
        value={dataObject.getData(fieldName)} onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </div>
  );
}

WebsitePathInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default WebsitePathInput;