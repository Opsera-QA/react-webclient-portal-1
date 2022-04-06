import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {errorHelpers} from "components/common/helpers/error-helpers";

function MultiSelectInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    groupBy,
    disabled,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    setDataFunction,
    busy,
    showClearValueButton,
    clearDataFunction,
    className,
    showLabel,
    requireClearDataConfirmation,
    clearDataDetails,
    linkTooltipText,
    detailViewLink,
    infoOverlay,
    onSearchFunction,
    formatDataFunction,
    parseValueFunction,
    error,
    pluralTopic,
    visible,
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
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
    const parsedValues = parseValues(valueArray);

    if (parsedValues.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    newDataObject.setData(fieldName, parsedValues);
    const errors = newDataObject.isFieldValid(field.id);
    const newErrorMessage = Array.isArray(errors) && errors.length > 0 ? errors[0] : "";
    setErrorMessage(newErrorMessage);

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
    if (
         dataObject?.getArrayData(fieldName).length !== 0
      && disabled !== true
      && showClearValueButton !== false
      && (setDataFunction == null || clearDataFunction))
    {
      return (clearValue);
    }
  };

  const parseValues = (valueArray) => {
    if (valueField == null) {
      return valueArray;
    }

    let parsedValues = [];

    if (valueArray != null && valueArray.length > 0) {
      valueArray.map((value) => {
        if (parseValueFunction) {
          const parsedValue = parseValueFunction(value);
          parsedValues.push(parsedValue);
        }
        else if (typeof value === "string") {
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

  const getErrorMessage = () => {
    if (hasStringValue(internalErrorMessage) === true) {
      return internalErrorMessage;
    }

    if (hasStringValue(errorMessage) === true) {
      return errorMessage;
    }
  };

  const getPlaceholderText = () => {
    if (hasStringValue(internalPlaceholderText) === true) {
      return internalPlaceholderText;
    }

    if (hasStringValue(placeholderText) === true) {
      return placeholderText;
    }

    if (hasStringValue(pluralTopic) === true) {
      return `Select ${pluralTopic}`;
    }

    return "Select One";
  };

  if (field == null || visible === false) {
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
        hasErrorState={hasStringValue(getErrorMessage()) === true}
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        busy={busy}
        groupBy={groupBy}
        value={dataObject.getData(fieldName) ? [...dataObject.getData(fieldName)] : []}
        placeholderText={getPlaceholderText()}
        disabled={disabled}
        setDataFunction={updateValue}
        onSearchFunction={onSearchFunction}
      />
      <InfoText
        fieldName={fieldName}
        model={dataObject}
        field={field}
        errorMessage={getErrorMessage()}
        hideRegexDefinitionText={true}
      />
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
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
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
  parseValueFunction: PropTypes.func,
  onSearchFunction: PropTypes.func,
  error: PropTypes.any,
  pluralTopic: PropTypes.string,
  visible: PropTypes.bool,
};

export default MultiSelectInputBase;