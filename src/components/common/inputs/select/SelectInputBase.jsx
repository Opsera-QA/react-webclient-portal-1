import React, {useState} from "react";
import PropTypes from "prop-types";
import DropdownList from "react-widgets/lib/DropdownList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";

function SelectInputBase({ fieldName, dataObject, setDataObject, groupBy, selectOptions, valueField, textField, placeholderText, setDataFunction, busy, disabled, clearDataFunction, showClearValueButton, errorMessage, getCurrentValue}) {
  const [field] = useState(dataObject?.getFieldById?.(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
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
    if (dataObject?.getData?.(field?.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearValue()} className="my-auto badge badge-danger clear-value-badge pointer">
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Clear Value
          </span>
        </TooltipWrapper>
      );
    }
  };

  const findCurrentValue = () => {
    if (getCurrentValue) {
      return getCurrentValue();
    }

    return dataObject?.getData?.(field?.id);
  };

  return (
    <InputContainer className="custom-select-input my-2">
      <InputLabel field={field} inputPopover={getClearDataIcon()} />
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
        disabled={disabled}
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
  getCurrentValue: PropTypes.func
};

SelectInputBase.defaultProps = {
  showClearValueButton: true
};

export default SelectInputBase;