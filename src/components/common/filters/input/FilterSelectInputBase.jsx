import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import InfoContainer from "components/common/containers/InfoContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";

function FilterSelectInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    clearDataFunction,
    groupBy,
    selectOptions,
    setDataFunction,
    valueField,
    textField,
    filter,
    placeholderText,
    busy,
    className,
    inline,
    disabled,
    loadDataFunction,
    showLabel,
    error,
    showClearValueButton,
  }) {
  const field = dataObject?.getFieldById(fieldName);

  const validateAndSetData = (fieldName, selectedOption) => {
    dataObject?.setData(fieldName, selectedOption);
    setDataObject({...dataObject});
  };

  const updateValue = (newValue) => {
    if (inline === true && loadDataFunction) {
      dataObject.setData(fieldName, newValue);
      loadDataFunction(dataObject);
    } if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    }
    else {
      const parsedValue = typeof newValue === "string" ? newValue : newValue[valueField];
      validateAndSetData(field?.id, parsedValue);
    }
  };

  const clearValue = () => {
    if (!setDataFunction && !clearDataFunction) {
      validateAndSetData(field?.id, "");
    }
    else if (clearDataFunction) {
      clearDataFunction(field?.id);
    }
  };

  const getClearDataFunction = () => {
    if (
      hasStringValue(dataObject.getData(field.id)) === true
      && inline !== true
      && disabled !== true
      && showClearValueButton !== false
      && (setDataFunction == null || clearDataFunction != null)
    ) {
      return clearValue;
    }
  };

  if (field == null) {
    console.error(`No Field was Found for ${fieldName}. Please add to the metadata if you would like it to be shown.`);
    return null;
  }

  return (
    <div className={className}>
      <InputLabel
        model={dataObject}
        showLabel={!inline || showLabel === true}
        field={field}
        className={undefined}
        disabled={disabled}
        isLoading={busy}
        clearDataFunction={getClearDataFunction()}
      />
      <StandaloneSelectInput
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        filter={filter}
        className={inline ? `inline-filter-input inline-select-filter` : undefined}
        groupBy={groupBy}
        value={dataObject?.getData(fieldName)}
        disabled={disabled || busy}
        busy={busy}
        placeholderText={placeholderText}
        setDataFunction={(data) => updateValue(data)}
      />
      <InfoText
        errorMessage={inline !== true ? error : undefined}
      />
    </div>
  );
}

FilterSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  loadDataFunction: PropTypes.func,
  selectOptions: PropTypes.array.isRequired,
  groupBy: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  filter: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  className: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  showLabel: PropTypes.bool,
  error: PropTypes.any,
  clearDataFunction: PropTypes.func,
  showClearValueButton: PropTypes.bool,
};

FilterSelectInputBase.defaultProps = {
  valueField: "value",
  textField: "text",
  filter: "contains",
  placeholderText: "Select One",
  className: "my-auto"
};

export default FilterSelectInputBase;