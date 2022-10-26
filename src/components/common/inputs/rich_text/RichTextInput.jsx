import React, { useState } from "react";
import PropTypes from "prop-types";
import RichTextInputBase from "components/common/inputs/rich_text/RichTextInputBase";
import InputContainer from "components/common/inputs/InputContainer";
import { faFileInvoice } from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";

export default function RichTextInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    className,
    minimumHeight,
    maximumHeight,
  }) {
  const field = model?.getFieldById(fieldName);

  const validateAndSetData = (fieldName, value) => {
    model?.setData(fieldName, value);
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
        bodyClassName={"rich-text-input"}
      >
        <RichTextInputBase
          value={model?.getData(fieldName)}
          setDataFunction={updateValue}
        />
      </InfoContainer>
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
};