import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";

function TextAreaInputBase(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    rowCount,
    disabled,
    error,
    className,
    customTitleText,
    titleIcon,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setField(model?.getFieldById(fieldName));
  }, [fieldName]);

  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const validateAndSetData = (value) => {
    const newModel = model;
    newModel.setTextData(fieldName, value);
    setErrorMessage(newModel?.getFieldError(fieldName));
    setModel({...newModel});
  };

  const updateValue = (newValue) => {
    if (typeof newValue !== "string") {
      setErrorMessage(`${field?.label} must be a string.`);
      return;
    }

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

  const getTitleText = () => {
    if (hasStringValue(customTitleText) === true) {
      return customTitleText;
    }

    return field?.label;
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className + " input-for-" + fieldName}>
      <InfoContainer
        titleText={getTitleText()}
        titleIcon={titleIcon}
      >
        <div className={"m-2"}>
          <textarea
            disabled={disabled}
            value={model?.getData(fieldName)}
            onChange={(event) => updateValue(event.target.value)}
            className={"form-control"}
            rows={rowCount}
          />
        </div>
      </InfoContainer>
      <InfoText
        field={field}
        errorMessage={errorMessage}
        model={model}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

TextAreaInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  rowCount: PropTypes.number,
  className: PropTypes.string,
  customTitleText: PropTypes.string,
  titleIcon: PropTypes.object,
};

TextAreaInputBase.defaultProps = {
  rowCount: 5,
};

export default TextAreaInputBase;