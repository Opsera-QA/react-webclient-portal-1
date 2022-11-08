import React, { useState } from "react";
import PropTypes from "prop-types";
import RichTextInputBase from "components/common/inputs/rich_text/RichTextInputBase";
import InputContainer from "components/common/inputs/InputContainer";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

export default function RichTextInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    className,
    minimumHeight,
    maximumHeight,
    disabled,
    titleRightSideButton,
  }) {
  const field = model?.getFieldById(fieldName);
  const [error, setError] = useState(undefined);

  const validateAndSetData = (fieldName, value) => {
    model?.setData(fieldName, value);
    setError(model?.getFieldError(fieldName));
    setModel({...model});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    } else {
      validateAndSetData(field?.id, newValue);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InfoContainer
        titleIcon={faFileInvoice}
        titleText={model?.getLabel(fieldName)}
        maximumHeight={maximumHeight}
        minimumHeight={minimumHeight}
        titleRightSideButton={titleRightSideButton}
      >
        <RichTextInputBase
          value={model?.getData(fieldName)}
          setDataFunction={updateValue}
          disabled={disabled}
        />
      </InfoContainer>
      <InfoText
        errorMessage={error}
        field={field}
        fieldName={fieldName}
        model={model}
      />
    </InputContainer>
  );
}

RichTextInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  disabled: PropTypes.bool,
  titleRightSideButton: PropTypes.any,
};