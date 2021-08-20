import React, { useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

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
    <InputContainer>
      <InputLabel field={field}/>
      <input
        disabled={disabled}
        type="text"
        value={dataObject.getData(fieldName)} onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

WebsitePathInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default WebsitePathInput;