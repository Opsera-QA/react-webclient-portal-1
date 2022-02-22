import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import {Combobox} from "@opsera/dhx-suite-package";
import VanityComboBoxInputBase from "components/common/inputs/select/VanityComboBoxInputBase";

// TODO: This will replace select input base after it is verified
function VanityComboBoxInput(
  {
    fieldName, dataObject, setDataObject, groupBy,
    selectOptions, valueField, textField, placeholderText,
    setDataFunction, busy, disabled, clearDataFunction,
    showClearValueButton, errorMessage, getCurrentValue,
    showLabel, formatItems, className, multiselect
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject?.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    }
    else {
      validateAndSetData(field?.id, newValue[valueField]);
    }
  };

  const clearValue = () => {
    if (!setDataFunction) {
      validateAndSetData(field?.id, "");
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataFunction = () => {
    if (dataObject?.getData(field?.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (clearValue);
    }
  };

  const findCurrentValue = () => {
    if (getCurrentValue) {
      return getCurrentValue();
    }

    return dataObject?.getData(field.id);
  };

  const formatSelectOptions = () => {
    if (Array.isArray(selectOptions) && selectOptions.length > 0) {
      if (formatItems === false) {
        return selectOptions;
      }

      selectOptions.map((item) => {
        item.value = item[textField];
        item.id = item[valueField];
      });

      return selectOptions;
    }

    return [];
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InputLabel showLabel={showLabel} field={field} clearDataFunction={getClearDataFunction()} model={dataObject} />
      <VanityComboBoxInputBase
        selectOptions={formatSelectOptions()}
        disabled={disabled}
        busy={busy}
        currentValue={findCurrentValue()}
        placeholderText={placeholderText}
        updateValue={updateValue}
        multiselect={multiselect}
      />
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

VanityComboBoxInput.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  showClearValueButton: PropTypes.bool,
  errorMessage: PropTypes.string,
  getCurrentValue: PropTypes.func,
  showLabel: PropTypes.bool,
  formatItems: PropTypes.bool,
  className: PropTypes.string,
  multiselect: PropTypes.bool
};

VanityComboBoxInput.defaultProps = {
  showClearValueButton: true,
  placeholderText: "Select One"
};

export default VanityComboBoxInput;