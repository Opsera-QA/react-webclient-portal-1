import React, {useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";

function MultiSelectInputBase(
  {
    fieldName, dataObject, setDataObject, groupBy,
    disabled, selectOptions, valueField, textField,
    placeholderText, setDataFunction, busy, showClearValueButton,
    clearDataFunction, className, showLabel, requireClearDataConfirmation,
    clearDataDetails, linkTooltipText, detailViewLink, infoOverlay,
    formatDataFunction,
  }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  // TODO: Implement
  // useEffect(() => {
  //   setOptions([]);
  //   if (Array.isArray(selectOptions)) {
  //     if (formatDataFunction && selectOptions?.length > 0) {
  //       const formattedOptions = formatDataFunction(selectOptions);
  //
  //       if (Array.isArray(formattedOptions)) {
  //         setOptions(formattedOptions);
  //       }
  //     }
  //     else {
  //       setOptions(selectOptions);
  //     }
  //   }
  // }, [selectOptions]);

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

  const getClearDataFunction = () => {
    if (dataObject.getData(field.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (clearValue);
    }
  };

  const parseValues = (valueArray) => {
    if (valueField == null) {
      return valueArray;
    }

    let parsedValues = [];

    if (valueArray != null && valueArray.length > 0) {
      valueArray.map(value => {
        if (typeof value === "string") {
          parsedValues.push(value);
        }
        else {
          parsedValues.push(value[valueField]);
        }
      });
    }

    return parsedValues;
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      // TODO: Should we also handle parsing values here?
      setDataFunction(field?.id, newValue);
    }
    else {
      validateAndSetData(field?.id, newValue);
    }
  };


  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className ? className : undefined}>
      <InputLabel
        model={dataObject}
        showLabel={showLabel}
        field={field}
        clearDataFunction={getClearDataFunction()}
        requireClearDataConfirmation={requireClearDataConfirmation}
        linkTooltipText={linkTooltipText}
        detailViewLink={detailViewLink}
        clearDataDetails={clearDataDetails}
        infoOverlay={infoOverlay}
      />
      <StandaloneMultiSelectInput
        hasErrorState={hasStringValue(errorMessage) === true}
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        busy={busy}
        groupBy={groupBy}
        value={dataObject.getData(fieldName) ? [...dataObject.getData(fieldName)] : []}
        placeholderText={placeholderText}
        disabled={disabled}
        setDataFunction={updateValue}
      />
      <InfoText errorMessage={errorMessage} field={field}/>
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
  requireClearDataConfirmation: PropTypes.bool,
  showLabel: PropTypes.bool,
  clearDataDetails: PropTypes.any,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  infoOverlay: PropTypes.any,
  formatDataFunction: PropTypes.func,
};

MultiSelectInputBase.defaultProps = {
  showClearValueButton: true
};

export default MultiSelectInputBase;