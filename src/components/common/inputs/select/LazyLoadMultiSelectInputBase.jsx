import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { errorHelpers } from "components/common/helpers/error-helpers";

function LazyLoadMultiSelectInputBase(
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
    inputHelpOverlay,
    onToggleFunction,
    onSearchFunction,
    useToggle,
    helpTooltipText,
    error,
    pluralTopic,
    singularTopic,
  }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");

  useEffect(() => {
    setInternalErrorMessage("");
    setInternalPlaceholderText("");

    if (error) {
      console.error(error);
      setInternalPlaceholderText(errorHelpers.constructApiResponseErrorPlaceholderText(pluralTopic));
      setInternalErrorMessage(errorHelpers.parseApiErrorForInfoText(pluralTopic, error));
    }
  }, [error]);

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;
    let parsedValues = parseValues(valueArray);

    if (parsedValues.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    newDataObject.setData(fieldName, parsedValues);
    let errors = newDataObject.isFieldValid(field.id);

    if (errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    } else {
      setErrorMessage("");
    }

    setDataObject({ ...newDataObject });
  };

  const clearValue = () => {
    if (!setDataFunction) {
      validateAndSetData(field.id, []);
    } else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataFunction = () => {
    if (
      dataObject.getData(field.id) !== "" &&
      !disabled &&
      showClearValueButton &&
      (setDataFunction == null || clearDataFunction)
    ) {
      return clearValue;
    }
  };

  const parseValues = (valueArray) => {
    if (valueField == null) {
      return valueArray;
    }

    let parsedValues = [];

    if (valueArray != null && valueArray.length > 0) {
      valueArray.map((value) => {
        if (typeof value === "string") {
          parsedValues.push(value);
        } else {
          parsedValues.push(value[valueField]);
        }
      });
    }

    return parsedValues;
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

    if (hasStringValue(singularTopic) === true) {
      return `Select ${singularTopic}`;
    }

    return "Select One";
  };


  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className ? className : undefined} fieldName={fieldName}>
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
        inputHelpOverlay={inputHelpOverlay}
        hasError={hasStringValue(getErrorMessage()) === true}
        helpTooltipText={helpTooltipText}
      />
      <div className={"custom-multiselect-input"}>
        <StandaloneMultiSelectInput
          selectOptions={selectOptions}
          valueField={valueField}
          textField={textField}
          busy={busy}
          filter="contains"
          groupBy={groupBy}
          onToggleFunction={(test) => {
            if (useToggle && test === true && (!Array.isArray(selectOptions) || selectOptions?.length === 0)) {
              onToggleFunction();
            }
          }}
          value={dataObject.getData(fieldName) ? [...dataObject.getData(fieldName)] : []}
          placeholderText={getPlaceholderText()}
          disabled={disabled}
          onSearchFunction={onSearchFunction}
          setDataFunction={(newValue) =>
            setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)
          }
          lazyLoad={true}
        />
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={getErrorMessage()}
        hideRegexDefinitionText={true}
      />
    </InputContainer>
  );
}

LazyLoadMultiSelectInputBase.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  maxNumber: PropTypes.number,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  showClearValueButton: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  className: PropTypes.string,
  requireClearDataConfirmation: PropTypes.bool,
  showLabel: PropTypes.bool,
  clearDataDetails: PropTypes.any,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  inputHelpOverlay: PropTypes.any,
  infoOverlay: PropTypes.any,
  onToggleFunction: PropTypes.func,
  onSearchFunction: PropTypes.func,
  useToggle: PropTypes.bool,
  helpTooltipText: PropTypes.string,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  error: PropTypes.any,
};

LazyLoadMultiSelectInputBase.defaultProps = {
  showClearValueButton: true,
};

export default LazyLoadMultiSelectInputBase;
