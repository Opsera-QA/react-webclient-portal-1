import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import VanityTextInputBase from "components/common/inputs/text/VanityTextInputBase";

function VanityTextInput({fieldName, className, dataObject, setDataObject, setDataFunction, showLabel, disabled  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (dataObject.getData(fieldName) !== "") {
      setErrorMessage(dataObject.getFieldError(fieldName));
    }
  }, [dataObject]);

  const getInputClasses = () => {
    let classes = `text-input`;

    if (errorMessage !== "") {
      classes += ` border border-danger error-text`;
    }

    // if (inputClasses) {
    //   classes += ` ${inputClasses}`;
    // }

    return classes;
  };

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject?.setData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    }
    else {
      validateAndSetData(field?.id, newValue);
    }
  };

  return (
    <InputContainer className={className}>
      <InputLabel model={dataObject} showLabel={showLabel} field={field}/>
      <VanityTextInputBase
        setDataFunction={updateValue}
        data={dataObject?.getData(fieldName)}
        disabled={disabled}
        className={getInputClasses()}
      />
      <InfoText
        fieldName={fieldName}
        model={dataObject}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

VanityTextInput.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool
};

export default VanityTextInput;