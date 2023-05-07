import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import { hasStringValue } from "components/common/helpers/string-helpers";

// TODO: Note, use TextAreaInputBase instead
function TextAreaInput({ fieldName, dataObject, setDataObject, disabled }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        model={dataObject}
        field={field}
        hasError={hasStringValue(errorMessage) === true}
      />
      <textarea
        disabled={disabled}
        value={dataObject.getData(fieldName)} onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
        rows={5}
        id={fieldName}
      />
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

TextAreaInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default TextAreaInput;