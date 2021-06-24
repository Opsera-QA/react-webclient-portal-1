import React, {useState} from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import ClearDataIcon from "components/common/icons/field/ClearDataIcon";

function SelectInputBase(
  {
    fieldName, dataObject, setDataObject, groupBy,
    selectOptions, valueField, textField, placeholderText,
    setDataFunction, busy, disabled, clearDataFunction,
    showClearValueButton, errorMessage, getCurrentValue,
    showLabel, className, onSearch, requireClearDataConfirmation,
    clearDataDetails
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject?.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (data) => {
    if (setDataFunction) {
      setDataFunction(field?.id, data);
    }
    else {
      validateAndSetData(field?.id, data[valueField]);
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

  const getClearDataIcon = () => {
    if (dataObject?.getData(field?.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (
        <ClearDataIcon
          furtherDetails={clearDataDetails}
          requireConfirmation={requireClearDataConfirmation}
          clearValueFunction={clearValue}
        />
      );
    }
  };

  const findCurrentValue = () => {
    if (getCurrentValue) {
      return getCurrentValue();
    }

    return dataObject?.getData(field.id);
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InputLabel showLabel={showLabel} field={field} inputPopover={getClearDataIcon()} />
      <DropdownList
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={findCurrentValue()}
        filter={"contains"}
        busy={busy}
        placeholder={placeholderText}
        onChange={(data) => updateValue(data)}
        disabled={disabled || !Array.isArray(selectOptions) || selectOptions.length === 0}
        onSearch={onSearch}
      />
      <InfoText field={field} errorMessage={errorMessage} />
    </InputContainer>
  );
}

SelectInputBase.propTypes = {
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
  className: PropTypes.string,
  onSearch: PropTypes.func,
  requireClearDataConfirmation: PropTypes.bool,
  clearDataDetails: PropTypes.any
};

SelectInputBase.defaultProps = {
  showClearValueButton: true,
  className: "custom-select-input my-2",
  placeholderText: "Select One"
};

export default SelectInputBase;