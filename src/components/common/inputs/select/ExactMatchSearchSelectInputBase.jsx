import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {errorHelpers} from "components/common/helpers/error-helpers";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useExternalToolPropertyCacheEntry from "hooks/cache/external_tools/useExternalToolPropertyCache";
import _ from "lodash";

function ExactMatchSearchSelectInputBase(
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
    defaultValue,
    clearDataFunction,
    showClearValueButton,
    errorMessage, // TODO: deprecate, pass in error instead
    getCurrentValue,
    showLabel,
    className,
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
    externalCacheToolId,
    externalCacheToolIdentifier,
    supportSearchLookup,
    noDataText,
    customLabel,
    dropUp,
    requiresLookup,
    exactMatchSearch,
  }) {
  const field = dataObject?.getFieldById(fieldName);
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");
  const [enabled, setEnabled] = useState(undefined);
  const {
    cachedEntry,
    setCachedValue,
    isHandlingCache,
    isCachedEntryRelevant,
  } = useExternalToolPropertyCacheEntry(
    requireUserEnable === true,
    dataObject?.getData(fieldName),
    externalCacheToolId,
    externalCacheToolIdentifier,
  );

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

  const updateValue = async (newValue) => {
    setInternalErrorMessage("");

    if(requiresLookup){
      const searchedItem = await exactMatchSearch(newValue);
      
      if (!searchedItem){
        validateAndSetData(field?.id, null);
        setInternalErrorMessage("There was no exact match of this branch name. Please search for another branch.")
        return;
      }
    }

    const parsedNewValue = DataParsingHelper.parseObject(newValue);
    const parsedValueField = DataParsingHelper.parseString(valueField);

    if (parsedNewValue && parsedValueField && (externalCacheToolIdentifier || externalCacheToolId)) {
      const parameters = DataParsingHelper.parseNestedObject(cachedEntry, "parameters", {});
      parameters.cache = newValue;

      if (typeof textField === "string") {
        parameters.textField = textField;
      }

      setCachedValue(parsedNewValue[parsedValueField], parameters);
    }

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

  const getInfoMessage = () => {
    if (
      disabled !== true
      && busy !== true
      && enabled === true
      && hasStringValue(pluralTopic) === true
      && (!Array.isArray(selectOptions) || selectOptions.length === 0)) {
      return `No ${pluralTopic} found for the selected criteria`;
    }

    if (hasStringValue(customInfoTextMessage) === true) {
      return customInfoTextMessage;
    }
  };

  const getPlaceholderText = () => {
    if (disabled !== true && requireUserEnable === true && enabled === false && hasStringValue(pluralTopic) === true) {
      return `Click to Load ${pluralTopic} and Enable Edit Mode`;
    }

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

  const getFormattedLabelForValue = (value) => {
    const parsedValueObject = DataParsingHelper.parseObject(value);

    if (typeof textField === "function") {
      return textField(value);
    } else if (parsedValueObject && typeof textField === "string") {
      return parsedValueObject[textField];
    }

    return value;
  };

  const handleTextFieldFunction = (foundValue) => {
    let formattedValue;
    const parsedFoundValueObject = DataParsingHelper.parseObject(foundValue);
    const currentValue = DataParsingHelper.parseString(dataObject?.getData(fieldName));
    const isCacheRelevant = isCachedEntryRelevant(foundValue, valueField);

    if (isCacheRelevant === true && currentValue) {
      if (parsedFoundValueObject) {
        const parameters = DataParsingHelper.parseNestedObject(cachedEntry, "parameters", {});
        parameters.cache = parsedFoundValueObject;
        formattedValue = getFormattedLabelForValue(parsedFoundValueObject);

        if (typeof textField === "string") {
          parameters.textField = textField;
        }

        setCachedValue(parsedFoundValueObject[valueField], parameters);
      }

      const parsedCache = DataParsingHelper.parseNestedObject(cachedEntry, "parameters.cache");

      if (!formattedValue && parsedCache) {
        const parsedCacheTextField = DataParsingHelper.parseNestedString(cachedEntry, "parameters.textField");

        if (textField) {
          formattedValue = getFormattedLabelForValue(parsedCache);
        } else if (parsedCacheTextField) {
          formattedValue = parsedCache[parsedCacheTextField];
        }
      }
    }

    if (formattedValue) {
      return formattedValue;
    }

    return getFormattedLabelForValue(foundValue);
  };

  const onSearchFunction = useCallback(
    loadDataFunction ? _.debounce(loadDataFunction, 600) : undefined,
    [loadDataFunction],
  );

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
        enableEditingFunction={disabled !== true && requireUserEnable === true && enabled === false ? enableEditingFunction : undefined}
        ellipsisOnClickFunction={ellipsisOnClickFunction}
        inputHelpOverlay={inputHelpOverlay}
        hasError={hasStringValue(internalErrorMessage) === true || hasStringValue(errorMessage) === true}
        helpTooltipText={helpTooltipText}
        loadDataFunction={loadDataFunction}
        disabled={disabled}
        isLoading={busy}
        customLabel={customLabel}
      />
      <div className={"d-flex"}>
        <StandaloneSelectInput
          hasErrorState={hasStringValue(getErrorMessage()) === true}
          selectOptions={selectOptions}
          fieldName={fieldName}
          valueField={valueField}
          textField={externalCacheToolId || externalCacheToolIdentifier ? handleTextFieldFunction : textField}
          groupBy={groupBy}
          value={findCurrentValue()}
          defaultValue={defaultValue}
          busy={busy || isHandlingCache === true}
          placeholderText={getPlaceholderText()}
          setDataFunction={(newValue) => updateValue(newValue)}
          disabled={disabled || (requireUserEnable === true && enabled === false)}
          onSearchFunction={supportSearchLookup === true && typeof loadDataFunction === "function" ? onSearchFunction : undefined}
          onClickFunction={requireUserEnable === true && enabled === false ? enableEditingFunction : undefined}
          noDataText={noDataText}
          dropUp={dropUp}
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
        customMessage={getInfoMessage()}
      />
    </InputContainer>
  );
}

ExactMatchSearchSelectInputBase.propTypes = {
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
  defaultValue: PropTypes.any,
  errorMessage: PropTypes.string,
  getCurrentValue: PropTypes.func,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
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
  externalCacheToolId: PropTypes.string,
  externalCacheToolIdentifier: PropTypes.string,
  supportSearchLookup: PropTypes.bool,
  noDataText: PropTypes.string,
  customLabel: PropTypes.string,
  dropUp: PropTypes.bool,
};

ExactMatchSearchSelectInputBase.defaultProps = {
  showClearValueButton: true,
  className: "custom-select-input my-2",
  dropUp: false,
};

export default ExactMatchSearchSelectInputBase;
