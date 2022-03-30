import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneComboBoxInput from "components/common/inputs/combo_box/StandaloneComboBoxInput";
import {errorHelpers} from "components/common/helpers/error-helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

function ComboBoxInputBase(
  {
    fieldName,
    model,
    setModel,
    groupBy,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    setDataFunction,
    busy,
    disabled,
    className,
    showLabel,
    error,
    singularTopic,
    pluralTopic,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");

  useEffect(() => {
    setInternalErrorMessage("");
    setInternalPlaceholderText("");

    if (error) {
      setInternalPlaceholderText(errorHelpers.constructApiResponseErrorPlaceholderText(pluralTopic));
      setInternalErrorMessage(errorHelpers.parseApiErrorForInfoText(pluralTopic, error));
    }
  }, [error]);

  const validateAndSetData = (fieldName, value) => {
    const newDataObject = model;
    newDataObject.setData(fieldName, value);
    setModel({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      const parsedValue = typeof newValue === "string" ? newValue : newValue[valueField];
      validateAndSetData(parsedValue);
    }
  };

  const getPlaceholderText = () => {
    if (hasStringValue(internalPlaceholderText) === true) {
      return internalPlaceholderText;
    }

    if (hasStringValue(placeholderText) === true) {
      return placeholderText;
    }

    if (hasStringValue(singularTopic) === true) {
      return `Select ${singularTopic} or Enter Value`;
    }

    return "Select or Enter Value";
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InputLabel
        showLabel={showLabel}
        field={field}
        model={model}
      />
      <StandaloneComboBoxInput
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={model?.getData(fieldName)}
        busy={busy}
        placeholderText={getPlaceholderText()}
        setDataFunction={(newValue) => updateValue(newValue)}
        disabled={disabled}
      />
      <InfoText
        field={field}
        model={model}
        fieldName={fieldName}
        errorMessage={internalErrorMessage}
      />
    </InputContainer>
  );
}

ComboBoxInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  selectOptions: PropTypes.array.isRequired,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  error: PropTypes.object,
};

export default ComboBoxInputBase;