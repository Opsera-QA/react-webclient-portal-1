import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { errorHelpers } from "components/common/helpers/error-helpers";

function LazyLoadSelectInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    groupBy,
    selectOptions,
    valueField,
    textField,
    placeholderText,
    setDataFunction,
    busy,
    disabled,
    clearDataFunction,
    showClearValueButton,
    errorMessage,
    getCurrentValue,
    showLabel,
    className,
    onSearchFunction,
    requireClearDataConfirmation,
    clearDataDetails,
    linkTooltipText,
    detailViewLink,
    infoOverlay,
    linkIcon,
    ellipsisTooltipText,
    lenientClearValueButton,
    onToggleFunction,
    inputHelpOverlay,
    helpTooltipText,
    error,
    pluralTopic,
    singularTopic,
  }) {
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

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject?.setData(fieldName, value);
    setDataObject({ ...newDataObject });
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newValue);
    } else {
      const parsedValue = typeof newValue === "string" ? newValue : newValue[valueField];
      validateAndSetData(field?.id, parsedValue);
    }
  };

  const clearValue = () => {
    if (!setDataFunction && !clearDataFunction) {
      validateAndSetData(field?.id, "");
    } else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataFunction = () => {
    if (
      dataObject?.getData(field?.id) !== ""
      && (disabled === false || lenientClearValueButton === true)
      && showClearValueButton !== false
      && (setDataFunction == null || clearDataFunction)
    ) {
      return clearValue;
    }
  };

  const findCurrentValue = () => {
    if (getCurrentValue) {
      return getCurrentValue();
    }

    return dataObject?.getData(field.id);
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
    <InputContainer className={className} fieldName={fieldName}>
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
        linkIcon={linkIcon}
        ellipsisTooltipText={ellipsisTooltipText}
        inputHelpOverlay={inputHelpOverlay}
        hasError={hasStringValue(errorMessage) === true}
        helpTooltipText={helpTooltipText}
      />
      <StandaloneSelectInput
        selectOptions={selectOptions}
        valueField={valueField}
        textField={textField}
        groupBy={groupBy}
        value={findCurrentValue()}
        busy={busy}
        onToggle={(test) => {
          if (test === true) {
            onToggleFunction();
          }
        }}
        placeholderText={getPlaceholderText()}
        setDataFunction={(newValue) => updateValue(newValue)}
        disabled={disabled}
        onSearchFunction={onSearchFunction}
        lazyLoad={true}
      />
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

LazyLoadSelectInputBase.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  showClearValueButton: PropTypes.bool,
  errorMessage: PropTypes.string,
  getCurrentValue: PropTypes.func,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  onSearchFunction: PropTypes.func,
  requireClearDataConfirmation: PropTypes.bool,
  clearDataDetails: PropTypes.any,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  inputHelpOverlay: PropTypes.any,
  infoOverlay: PropTypes.any,
  linkIcon: PropTypes.object,
  ellipsisTooltipText: PropTypes.string,
  lenientClearValueButton: PropTypes.bool,
  onToggleFunction: PropTypes.func,
  helpTooltipText: PropTypes.string,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  error: PropTypes.any,
};

LazyLoadSelectInputBase.defaultProps = {
  showClearValueButton: true,
  className: "custom-select-input my-2",
  placeholderText: "Select One",
};

export default LazyLoadSelectInputBase;