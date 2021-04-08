import React, {useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets';
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function MultiSelectInputBase({ fieldName, dataObject, setDataObject, groupBy, disabled, selectOptions, valueField, textField, placeholderText, setDataFunction, busy, showClearValueButton, clearDataFunction, className, showLabel}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;
    let parsedValues = parseValues(valueArray);

    if (parsedValues.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    newDataObject.setData(fieldName, parsedValues);
    let errors = newDataObject.isFieldValid(field.id);

    if ( errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }

    setDataObject({...newDataObject});
  };

  const clearValue = () => {
    if (!setDataFunction) {
      validateAndSetData(field.id, []);
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataIcon = () => {
    if (dataObject.getData(field.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearValue()} className="my-auto badge badge-danger clear-value-badge pointer">
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Clear Value
          </span>
        </TooltipWrapper>
      );
    }
  };

  const parseValues = (valueArray) => {
    if (valueField == null) {
      return valueArray;
    }

    let parsedValues = [];

    if (valueArray != null && valueArray.length > 0) {
      valueArray.map(value => {
        parsedValues.push(value[valueField]);
      });
    }

    return parsedValues;
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className ? className : undefined}>
      <InputLabel field={field} inputPopover={getClearDataIcon()} showLabel={showLabel} />
      <div className={"custom-multiselect-input"}>
        <Multiselect
          data={selectOptions}
          valueField={valueField}
          textField={textField}
          busy={busy}
          filter="contains"
          groupBy={groupBy}
          value={dataObject.getData(fieldName) ? [...dataObject.getData(fieldName)] : [] }
          placeholder={placeholderText}
          disabled={disabled}
          onChange={newValue => setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)}
        />
      </div>
      <InfoText errorMessage={errorMessage} field={field} />
    </InputContainer>
  );
}

MultiSelectInputBase.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  maxNumber: PropTypes.number,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  showClearValueButton: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

MultiSelectInputBase.defaultProps = {
  showClearValueButton: true
};

export default MultiSelectInputBase;