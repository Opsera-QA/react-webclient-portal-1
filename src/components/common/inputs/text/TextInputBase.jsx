import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function TextInputBase({ fieldName, dataObject, setDataObject, disabled, type, inputPopover, inputClasses }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setField(dataObject?.getFieldById(fieldName));
  }, [fieldName]);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const getInputClasses = () => {
    let classes = `form-control`;

    if (errorMessage !== "") {
      classes += ` border border-danger error-text`;
    }

    if (inputClasses) {
      classes += ` ${inputClasses}`;
    }

    return classes;
  };

  return (
    <InputContainer>
      <InputLabel field={field} inputPopover={inputPopover} />
      <input
        type={type}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        className={getInputClasses()}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

TextInputBase.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  inputPopover: PropTypes.object,
  inputClasses: PropTypes.string,
  disabled: PropTypes.bool
};

export default TextInputBase;