import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";

function TextInputBase(
  {
    fieldName, dataObject, setDataObject, disabled, type,
    showLabel, inputClasses, linkTooltipText, detailViewLink, infoOverlay,
    setDataFunction, name, style, className, error
  }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setField(dataObject?.getFieldById(fieldName));
  }, [fieldName]);

  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      const newDataObject = setDataFunction(fieldName, newValue);

      if (newDataObject) {
        setErrorMessage(newDataObject?.getFieldError(fieldName));
      }
    }
    else {
      validateAndSetData(newValue);
    }
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
    <InputContainer className={className}>
      <InputLabel
        showLabel={showLabel}
        field={field}
        linkTooltipText={linkTooltipText}
        detailViewLink={detailViewLink}
        infoOverlay={infoOverlay}
      />
      <input
        type={type}
        style={style}
        disabled={disabled}
        name={name}
        value={dataObject.getData(fieldName)}
        onChange={(event) => updateValue(event.target.value)}
        className={getInputClasses()}
        autoComplete="off"
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
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  infoOverlay: PropTypes.any,
  setDataFunction: PropTypes.func,
  name: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default TextInputBase;