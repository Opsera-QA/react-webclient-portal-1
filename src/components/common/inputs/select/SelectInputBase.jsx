import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {errorHelpers, parseError} from "components/common/helpers/error-helpers";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

function SelectInputBase(
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
    errorMessage, // TODO: deprecate, pass in error instead
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
    error,
    singularTopic,
    pluralTopic,
    visible,
    customInfoTextMessage,
    inputHelpOverlay,
    helpTooltipText,
    loadDataFunction,
    handleCreateFunction,
    requireUserEnable,
    ellipsisOnClickFunction,
    onEnableEditFunction,
}) {
  const field = dataObject?.getFieldById(fieldName);
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");
  const [enabled, setEnabled] = useState(undefined);

  useEffect(() => {
    setEnabled(requireUserEnable !== true);
  }, [requireUserEnable]);

  useEffect(() => {
    setInternalErrorMessage("");
    setInternalPlaceholderText("");

    if (error) {
      setInternalPlaceholderText(errorHelpers.constructApiResponseErrorPlaceholderText(pluralTopic));
      setInternalErrorMessage(errorHelpers.parseApiErrorForInfoText(pluralTopic, error));
    }
  }, [error]);

  const validateAndSetData = (fieldName, value) => {
    dataObject?.setData(fieldName, value);
    setDataObject({...dataObject});
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
      && ((disabled !== true && field?.isRequired !== true) || lenientClearValueButton === true)
      && showClearValueButton !== false
      && (setDataFunction == null || clearDataFunction != null)
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

  const enableEditingFunction = () => {
    setEnabled(true);

    if (onEnableEditFunction) {
      onEnableEditFunction();
    }
  };

  const getEnableEditFunction = () => {
    if (requireUserEnable === true && enabled === false) {
      return enableEditingFunction;
    }
  };

  if (field == null || visible === false) {
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
        enableEditingFunction={getEnableEditFunction()}
        ellipsisOnClickFunction={ellipsisOnClickFunction}
        inputHelpOverlay={inputHelpOverlay}
        hasError={hasStringValue(internalErrorMessage) === true || hasStringValue(errorMessage) === true}
        helpTooltipText={helpTooltipText}
        loadDataFunction={loadDataFunction}
        disabled={disabled}
        isLoading={busy}
      />
      <div className={"d-flex"}>
        <StandaloneSelectInput
          hasErrorState={hasStringValue(getErrorMessage()) === true}
          selectOptions={selectOptions}
          valueField={valueField}
          textField={textField}
          groupBy={groupBy}
          value={findCurrentValue()}
          busy={busy}
          placeholderText={getPlaceholderText()}
          setDataFunction={(newValue) => updateValue(newValue)}
          disabled={disabled || (requireUserEnable === true && enabled === false)}
          onSearchFunction={onSearchFunction}
        />
        <NewRecordButton
          addRecordFunction={handleCreateFunction}
          disabled={busy || disabled}
          size={"md"}
          className={"ml-2"}
          type={singularTopic}
        />
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={getErrorMessage()}
        hideRegexDefinitionText={true}
        customMessage={customInfoTextMessage}
      />
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
  error: PropTypes.any,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  visible: PropTypes.bool,
  customInfoTextMessage: PropTypes.string,
  helpTooltipText: PropTypes.string,
  loadDataFunction: PropTypes.func,
  handleCreateFunction: PropTypes.func,
  requireUserEnable: PropTypes.bool,
  ellipsisOnClickFunction: PropTypes.func,
  onEnableEditFunction: PropTypes.func,
};

SelectInputBase.defaultProps = {
  showClearValueButton: true,
  className: "custom-select-input my-2",
};

export default SelectInputBase;