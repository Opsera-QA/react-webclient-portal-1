import React from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneCheckboxInput from "components/common/inputs/boolean/checkbox/StandaloneCheckboxInput";

export default function CheckboxInputBase({fieldName, model, setModel, setDataFunction, disabled}) {
  const field = model?.getFieldById(fieldName);

  const validateAndSetData = (value) => {
    model.setData(fieldName, value);
    setModel({...model});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    } else {
      validateAndSetData(newValue);
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <StandaloneCheckboxInput
        id={field?.id}
        value={!!model?.getData(fieldName)}
        disabled={disabled}
        label={model?.getLabel(fieldName)}
        setDataFunction={updateValue}
      />
      <InfoText
        field={field}
        model={model}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

CheckboxInputBase.propTypes = {
  disabled: PropTypes.bool,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
};
