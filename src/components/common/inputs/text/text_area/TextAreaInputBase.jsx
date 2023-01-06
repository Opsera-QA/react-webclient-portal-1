import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InputLabel from "components/common/inputs/info_text/InputLabel";

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
    useInfoContainer,
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
    } else {
      validateAndSetData(newValue);
    }
  };

  const getInputClasses = () => {
    let classes = `form-control`;

    if (hasStringValue(errorMessage) === true) {
      classes += ` border border-danger error-text-alt`;
    }

    return classes;
  };

  const getErrorStyling = () => {
    if (hasStringValue(errorMessage) === true) {
      return ` error-text-alt`;
    }

    return "";
  };

  const getTitleText = () => {
    if (hasStringValue(customTitleText) === true) {
      return customTitleText;
    }

    return field?.label;
  };

  const getInput = () => {
    return (
      <div className={"d-flex" + getErrorStyling()}>
          <textarea
            disabled={disabled}
            value={model?.getData(fieldName)}
            onChange={(event) => updateValue(event.target.value)}
            className={getInputClasses()}
            rows={rowCount}
          />
      </div>
    );
  };

  const getBody = () => {
    if (useInfoContainer === false) {
      return (
        <>
          <InputLabel
            model={model}
            field={field}
            hasError={hasStringValue(errorMessage) === true}
          />
          {getInput()}
        </>
      );
    }

    return (
      <InfoContainer
        titleText={getTitleText()}
        titleIcon={titleIcon}
      >
        <div className={"m-2"}>
          {getInput()}
        </div>
      </InfoContainer>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer
      className={className}
      fieldName={fieldName}
    >
      {getBody()}
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
  useInfoContainer: PropTypes.bool,
};

TextAreaInputBase.defaultProps = {
  rowCount: 5,
};

export default TextAreaInputBase;