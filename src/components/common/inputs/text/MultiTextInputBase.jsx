import React, {useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";

function MultiTextInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    groupBy,
    disabled,
    selectOptions,
    placeholderText,
    setDataFunction,
    busy,
    showClearValueButton,
    clearDataFunction,
    className,
    showLabel,
  }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;

    if (valueArray.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    newDataObject.setData(fieldName, valueArray);
    let errors = newDataObject.isFieldValid(field.id);

    if ( errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }

    setDataObject({...newDataObject});
  };

  const handleCreate = (newValue) => {
    let newValueArray = dataObject.getArrayData(fieldName);
    newValueArray.push(newValue);
    validateAndSetData(fieldName, newValueArray);
  };

  const clearValue = () => {
    if (!setDataFunction) {
      validateAndSetData(field.id, []);
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataFunction = () => {
    if (dataObject.getData(field.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (clearValue);
    }
  };

  const getPlaceholderText = () => {
    if (hasStringValue(placeholderText) === true) {
      return placeholderText;
    }

    // TODO: Pick better text
    // return "Type Options and Select Create Option";
  };

  if (field == null) {
    return <></>;
  }

  return (
    <InputContainer className={className ? className : undefined}>
      <InputLabel
        model={dataObject}
        field={field}
        clearDataFunction={getClearDataFunction()}
        showLabel={showLabel}
      />
      <div className={"custom-multiselect-input"}>
        <StandaloneMultiSelectInput
          selectOptions={selectOptions}
          busy={busy}
          allowCreate={"onFilter"}
          createOptionFunction={(value) => handleCreate(value)}
          filter={"contains"}
          groupBy={groupBy}
          manualEntry={true}
          value={dataObject.getData(fieldName) ? [...dataObject.getData(fieldName)] : [] }
          placeholderText={getPlaceholderText()}
          disabled={disabled}
          setDataFunction={newValue => setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)}
        />
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        errorMessage={errorMessage}
        field={field}
      />
    </InputContainer>
  );
}

MultiTextInputBase.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
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

MultiTextInputBase.defaultProps = {
  showClearValueButton: true,
  selectOptions: []
};

export default MultiTextInputBase;