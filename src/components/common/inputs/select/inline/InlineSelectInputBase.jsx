import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import {errorHelpers} from "components/common/helpers/error-helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {faPencilAlt, faSave, faTimes} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import useExternalToolPropertyCacheEntry from "hooks/cache/external_tools/useExternalToolPropertyCache";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import _ from "lodash";
import useComponentStateReference from "hooks/useComponentStateReference";
import FieldLabel from "components/common/fields/FieldLabel";

export default function InlineSelectInputBase(
  {
    fieldName,
    model,
    setModel,
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
    handleSaveFunction,
    getLabelFunction,
  }) {
  const field = model?.getFieldById(fieldName);
  const value = model?.getData(fieldName);
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");
  const [enabled, setEnabled] = useState(undefined);
  const [inEditMode, setInEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    cachedEntry,
    setCachedValue,
    isHandlingCache,
    isCachedEntryRelevant,
  } = useExternalToolPropertyCacheEntry(
    requireUserEnable === true,
    model?.getData(fieldName),
    externalCacheToolId,
    externalCacheToolIdentifier,
  );
  const {
    toastContext,
  } = useComponentStateReference();

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
    model?.setData(fieldName, value);
    setModel({...model});
  };

  const updateValue = (newValue) => {
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
      hasStringValue(model.getData(field.id)) === true
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

    return model?.getData(field.id);
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
    if (disabled !== true && requireUserEnable === true && enabled === false) {
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
    const currentValue = DataParsingHelper.parseString(model?.getData(fieldName));
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

  const getInputBody = () => {
    return (
      <StandaloneSelectInput
        hasErrorState={hasStringValue(getErrorMessage()) === true}
        selectOptions={selectOptions}
        valueField={valueField}
        textField={externalCacheToolId || externalCacheToolIdentifier ? handleTextFieldFunction : textField}
        groupBy={groupBy}
        value={findCurrentValue()}
        busy={busy || isHandlingCache === true}
        placeholderText={getPlaceholderText()}
        setDataFunction={(newValue) => updateValue(newValue)}
        disabled={disabled || (requireUserEnable === true && enabled === false)}
        onSearchFunction={supportSearchLookup === true && typeof loadDataFunction === "function" ? onSearchFunction : undefined}
        onClickFunction={requireUserEnable === true && enabled === false ? enableEditingFunction : undefined}
      />
    );
  };

  const handleCancelFunction = () => {
    updateValue(model?.getOriginalValue(fieldName));
    setInEditMode(false);
  };

  const getEditIcon = () => {
    if (disabled !== true && inEditMode === false) {
      return (
        <IconBase
          icon={faPencilAlt}
          className={"ml-2 my-auto text-muted pointer"}
          iconSize={"sm"}
          onClickFunction={() => setInEditMode(true)}
        />
      );
    }
  };

  const handleSave = async () => {
    const isModelValid = model?.isModelValid();

    if (isModelValid !== true) {
      const errors = model.getErrors();
      toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    try {
      setIsSaving(true);
      await handleSaveFunction();
      toastContext.showUpdateSuccessResultDialog(model?.getType());
      setInEditMode(false);
    } catch (error) {
      toastContext.showUpdateFailureResultDialog(model?.getType(), error);
    } finally {
      setIsSaving(false);
    }
  };

  const getErrorStyling = () => {
    if (hasStringValue(errorMessage) === true) {
      return ` error-text-alt`;
    }

    return "";
  };

  const getSaveIcon = () => {
    if (inEditMode === true && model?.isFieldValid(fieldName) == null) {
      return (
        <IconBase
          icon={faSave}
          className={"ml-2 my-auto text-muted pointer"}
          iconSize={"sm"}
          isLoading={isSaving}
          onClickFunction={handleSave}
        />
      );
    }
  };

  const getCancelIcon = () => {
    if (isSaving !== true && inEditMode === true) {
      return (
        <IconBase
          icon={faTimes}
          className={"text-muted my-auto ml-3 pointer"}
          iconSize={"sm"}
          onClickFunction={handleCancelFunction}
        />
      );
    }
  };

  const getFormTextField = () => {
    if (inEditMode === true) {
      return (
        <InfoText
          model={model}
          fieldName={fieldName}
          field={field}
          errorMessage={getErrorMessage()}
          hideRegexDefinitionText={true}
          customMessage={customInfoTextMessage}
        />
      );
    }
  };

  // TODO: Use Field Label when everything is consistent
  const getFieldLabel = () => {
    return (
      //<FieldLabel field={field} />
      <div className={"text-muted mr-2 mt-auto"}>
        {field?.label}:
      </div>
    );
  };

  const getInput = () => {
    if (inEditMode !== true) {
      if (typeof getLabelFunction === "function") {
        return (
          <div className={"d-flex"}>
            {getFieldLabel()}
            <div className={"my-auto"}>
              {getLabelFunction(model?.getData(fieldName))}
            </div>
          </div>
        );
      }

      return (
        <div className={"d-flex"}>
          {getFieldLabel()}
          <div className={"my-auto"}>
            {model?.getData(fieldName)}
          </div>
        </div>
      );
    }

    return (
      <div className={"w-100 d-flex" + getErrorStyling()}>
        {getInputBody()}
        <NewRecordButton
          addRecordFunction={handleCreateFunction}
          disabled={busy || disabled}
          size={"md"}
          className={"ml-2"}
          type={singularTopic}
        />
      </div>
    );
  };

  const getLabel = () => {
    if (inEditMode !== true) {
      return;
    }

    return (
      <InputLabel
        model={model}
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
      />
    );
  };

  if (field == null || visible === false || handleSaveFunction == null) {
    return null;
  }

  return (
    <InputContainer
      className={className}
      fieldName={fieldName}
    >
      {getLabel()}
      <div className={"d-flex w-100"}>
        {getInput()}
        {getEditIcon()}
        {getSaveIcon()}
        {getCancelIcon()}
      </div>
      {getFormTextField()}
    </InputContainer>
  );
}

InlineSelectInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  selectOptions: PropTypes.array.isRequired,
  fieldName: PropTypes.string,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
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
  handleSaveFunction: PropTypes.func,
  getLabelFunction: PropTypes.func,
};