import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";

function SelectInputBase(
  {
    fieldName, dataObject, setDataObject, groupBy,
    selectOptions, valueField, textField, placeholderText,
    setDataFunction, busy, disabled, clearDataFunction,
    showClearValueButton, errorMessage, getCurrentValue,
    showLabel, className, onSearch, requireClearDataConfirmation,
    clearDataDetails, linkTooltipText, detailViewLink, infoOverlay, linkIcon,
    ellipsisTooltipText, lenientClearValueButton,
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
      const parsedValue = typeof newValue === "string" ? newValue : newValue[valueField];
      validateAndSetData(field?.id, parsedValue);
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

    if (dataObject?.getData(field?.id) !== "" && (disabled === false || lenientClearValueButton === true) && showClearValueButton !== false && (setDataFunction == null || clearDataFunction)) {
      return clearValue;
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
      <InputLabel
        showLabel={showLabel}
        field={field}
        clearDataFunction={getClearDataFunction()}
        requireClearDataConfirmation={requireClearDataConfirmation}
        linkTooltipText={linkTooltipText}
        detailViewLink={detailViewLink}
        clearDataDetails={clearDataDetails}
        infoOverlay={infoOverlay}
        linkIcon={linkIcon}
        ellipsisTooltipText={ellipsisTooltipText}
      />
      <DropdownList
        data={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={findCurrentValue()}
        filter={"contains"}
        busy={busy}
        placeholder={placeholderText}
        onChange={(newValue) => updateValue(newValue)}
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
  clearDataDetails: PropTypes.any,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  infoOverlay: PropTypes.any,
  linkIcon: PropTypes.object,
  ellipsisTooltipText: PropTypes.string,
  lenientClearValueButton: PropTypes.bool,
};

SelectInputBase.defaultProps = {
  showClearValueButton: true,
  className: "custom-select-input my-2",
  placeholderText: "Select One"
};

export default SelectInputBase;