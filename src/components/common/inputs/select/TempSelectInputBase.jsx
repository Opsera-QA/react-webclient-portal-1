import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import {Combobox} from "dhx-suite-package";

// TODO: This will replace select input base after it is verified
function TempSelectInputBase(
  {
    fieldName, dataObject, setDataObject, groupBy,
    selectOptions, valueField, textField, placeholderText,
    setDataFunction, busy, disabled, clearDataFunction,
    showClearValueButton, errorMessage, getCurrentValue,
    showLabel
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const containerRef = useRef(null);

  useEffect(() => {
    const comboBox = setUpComboBox();

    return () => {
      comboBox.destructor();
    };
  }, [dataObject, selectOptions, busy]);

  const setUpComboBox = () => {
    if (Array.isArray(selectOptions) && selectOptions.length > 0) {

      selectOptions.map((item) => {
        item.value = item[textField];
        item.id = item[valueField];
      });
    }

    let comboBox = new Combobox(containerRef.current, {
      data: selectOptions,
      placeholder: busy ? "Loading Data" : placeholderText,
      value: findCurrentValue()
    });

    if (disabled || busy) {
      comboBox.disable();
    }
    else {
      comboBox.events.on("Change", (value) => {
        updateValue(comboBox.getValue(value));
      });
    }

    return comboBox;
  };

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

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InputLabel showLabel={showLabel} field={field} clearDataFunction={getClearDataFunction()} model={dataObject} />
      <div className={"w-100"} id="select-input" ref={el => (containerRef.current = el)} />
      <InfoText
        field={field}
        errorMessage={errorMessage}
        model={dataObject}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

TempSelectInputBase.propTypes = {
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
  v2: PropTypes.bool
};

TempSelectInputBase.defaultProps = {
  showClearValueButton: true,
  placeholderText: "Select One"
};

export default TempSelectInputBase;