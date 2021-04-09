import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

// TODO: Use new PasswordComponent instead
function PasswordInput({fieldName, dataObject, setDataObject, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  useEffect(() => {
    checkValidation(dataObject);
  }, [dataObject]);

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;

    if (field.lowercase === true) {
      value = value.toLowerCase();
    }
    else if (field.uppercase === true) {
      value = value.toUpperCase();
    }

    // The input mask will limit text entry,
    // but complex validation can be done by using
    // "regexValidator" in metadata to not prevent text entry
    if (field.inputMaskRegex != null) {
      let format = field.inputMaskRegex;
      let meetsRegex = format.test(value);

      if (value !== '' && !meetsRegex) {
        return;
      }
    }

    newDataObject.setData(fieldName, value);
    checkValidation(newDataObject);
    setDataObject({...newDataObject});
  };

  const checkValidation = (newDataObject) => {
    let errors = newDataObject.isFieldValid(field.id);

    if ( errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }
  };

  return (
    <InputContainer className="form-group my-2">
      <InputLabel field={field}/>
      <input
        type={"password"}
        disabled={disabled}
        value={dataObject?.getData(fieldName)}
        className="form-control"
        onChange={e => validateAndSetData(fieldName, e.target.value)}
      />
      <InfoText field={field} errorMessage={errorMessage} />
    </InputContainer>
  );
}

PasswordInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default PasswordInput;