import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import {fieldValidation} from "core/data_model/modelValidation";
import useGetCustomerTags from "hooks/settings/tags/useGetCustomerTags";
import TagParsingHelper from "@opsera/persephone/helpers/data/tags/tagParsing.helper";
import {errorHelpers} from "components/common/helpers/error-helpers";
import useTagActions from "hooks/settings/tags/useTagActions";
import InlineInputSaveIcon from "temp-library-components/icon/inputs/InlineInputSaveIcon";
import InlineInputCancelIcon from "temp-library-components/icon/inputs/InlineInputCancelIcon";
import FieldLabel from "components/common/fields/FieldLabel";
import InlineInputEditIcon from "temp-library-components/icon/inputs/InlineInputEditIcon";
import CustomBadge from "components/common/badges/CustomBadge";
import {faTag} from "@fortawesome/pro-light-svg-icons";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";

export default function InlineTagManagerInput(
  {
    fieldName,
    type,
    model,
    setModel,
    disabled,
    setDataFunction,
    allowCreate,
    showInputLabel,
    allowedTypes,
    excludeTypes,
    getDisabledTags,
    placeholderText,
    className,
    fieldClassName,
    handleSaveFunction,
    visible,
    showFieldLabel,
  }) {
  const toastContext = useContext(DialogToastContext);
  const field = model?.getFieldById(fieldName);
  const [tagOptions, setTagOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [inEditMode, setInEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    customerTags,
    error,
    isLoading,
  } = useGetCustomerTags();
  const tagActions = useTagActions();

  useEffect(() => {
    loadTagOptions(customerTags);
  }, [customerTags]);

  useEffect(() => {
    setInternalErrorMessage("");
    setInternalPlaceholderText("");

    if (error) {
      setInternalPlaceholderText(errorHelpers.constructApiResponseErrorPlaceholderText("Tags"));
      setInternalErrorMessage(errorHelpers.parseApiErrorForInfoText("Tags", error));
    }
  }, [error]);

  const loadTagOptions = (tags) => {
    let currentOptions = [];

    tags.map((tag) => {
      const tagOption = TagParsingHelper.parseTag(tag);

      if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
        if (allowedTypes.includes(tagOption.type)) {
          currentOptions.push(tagOption);
        }
      }
      else if (Array.isArray(excludeTypes) && excludeTypes.length > 0) {
        if (!(excludeTypes.includes(tagOption.type))) {
          currentOptions.push(tagOption);
        }
      } else {
        currentOptions.push(tagOption);
      }
    });

    setTagOptions(currentOptions);
  };

  const validateAndSetData = (fieldName, value) => {
    const parsedTags = TagParsingHelper.parseTagArray(value);
    const errors = fieldValidation(parsedTags, model, field);

    if (Array.isArray(errors) && errors.length > 0) {
      setErrorMessage(errors[0]);
      return;
    }

    setErrorMessage("");
    model.setData(fieldName, parsedTags);
    setModel({...model});
  };

  const getExistingTag = (newTag) => {
    return tagOptions.find(tag => tag.type === type && tag.value === newTag);
  };

  const tagAlreadySelected = (newTag) => {
    const currentValues = model.getArrayData(fieldName);
    return currentValues != null && currentValues.length !== 0 && currentValues.find(tag => tag.type === type && tag.value === newTag) != null;
  };

  const handleCreate = async (newValue) => {
    const currentValues = model.getData(fieldName);
    newValue = newValue.trim();
    newValue = newValue.replaceAll(' ', '-');
    newValue = newValue.replace(/[^A-Za-z0-9-.]/gi, '');
    newValue = newValue.toLowerCase();
    const existingTag = getExistingTag(newValue);

    if (existingTag != null) {
      let tagSelected = tagAlreadySelected(newValue);
      if (!tagSelected) {
        currentValues.push(existingTag);
        validateAndSetData(fieldName, currentValues);
      }
      return;
    }

    try {
      const currentOptions = [...tagOptions];
      const newTag = {type: type, value: newValue, active: true, configuration: {}};
      const newTagOption = {type: type, value: newValue};
      const newTagDto = new Model(newTag, tagMetadata, true);
      await tagActions.createTag(newTagDto);
      currentValues.push(newTagOption);
      currentOptions.push(newTagOption);
      setTagOptions([...currentOptions]);
      validateAndSetData(fieldName, currentValues);
    }
    catch (error) {
      toastContext.showCreateFailureResultDialog("Tag", error);
    }
  };

  const handleCancelFunction = () => {
    validateAndSetData(fieldName, model?.getOriginalValue(fieldName));
    setInEditMode(false);
  };

  const handleSave = async () => {
    const isFieldValid = model?.isPotentialFieldValid(fieldName);

    if (isFieldValid !== true) {
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

  const getErrorMessage = () => {
    if (hasStringValue(internalErrorMessage) === true) {
      return internalErrorMessage;
    }

    if (hasStringValue(errorMessage) === true) {
      return errorMessage;
    }
  };

  const hasWarningState = () => {
    return field.noItemsWarning && model?.getArrayData(fieldName)?.length === 0;
  };

  const getTagDisplayer = () => {
    const tags = TagParsingHelper.parseTagArray(model?.getArrayData(fieldName), []);

    return (
      <CustomBadgeContainer>
        {tags.map((item, index) => {
          if (typeof item !== "string")
            return (
              <CustomBadge
                badgeText={<span><span className="mr-1">{item.type}:</span>{item.value}</span>}
                icon={faTag}
                key={index}
              />
            );
        })}
      </CustomBadgeContainer>
    );
  };

  const getFilteredTags = () => {
    const currentData = model?.getArrayData(fieldName);

    return tagOptions.filter((tag) => {
      return currentData.find((currentDataTag) => currentDataTag.type === tag.type && currentDataTag.value === tag.value) == null;
    });
  };

  if (type == null && allowCreate !== false) {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }

  if (field == null || visible === false || handleSaveFunction == null) {
    return null;
  }

  if (inEditMode === true) {
    return (
      <InputContainer className={className} fieldName={fieldName}>
        <InputLabel
          showLabel={showInputLabel !== false}
          model={model}
          field={field}
          hasError={hasStringValue(errorMessage) === true}
          hasWarningState={hasWarningState()}
          disabled={disabled}
          isLoading={isLoading}
        />
        <div className={"d-flex w-100"}>
          <StandaloneMultiSelectInput
            hasErrorState={hasStringValue(errorMessage)}
            hasWarningState={hasWarningState()}
            selectOptions={[...getFilteredTags()]}
            textField={(tag) => `${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`}
            allowCreate={hasStringValue(type) === true ? allowCreate : undefined}
            groupBy={(tag) => capitalizeFirstLetter(tag?.type, " ", "Undefined Type")}
            className={"d-flex w-100"}
            busy={isLoading}
            manualEntry={true}
            createOptionFunction={(value) => handleCreate(value)}
            value={[...model?.getArrayData(fieldName)]}
            placeholderText={internalPlaceholderText ? internalPlaceholderText : placeholderText}
            disabled={disabled || isSaving || isLoading || (getDisabledTags && getDisabledTags(tagOptions))}
            setDataFunction={(tagArray) => setDataFunction ? setDataFunction(field.id, TagParsingHelper.parseTagArray(tagArray)) : validateAndSetData(field.id, TagParsingHelper.parseTagArray(tagArray))}
            fieldName={fieldName}
          />
          <InlineInputSaveIcon
            isSaving={isSaving}
            handleSaveFunction={handleSave}
            visible={inEditMode === true && model?.isPotentialFieldValid(model?.getData(fieldName), fieldName) === true && model?.isChanged(fieldName) === true}
            disabled={disabled}
          />
          <InlineInputCancelIcon
            isSaving={isSaving}
            handleCancelFunction={handleCancelFunction}
            visible={isSaving !== true && inEditMode === true}
            disabled={disabled}
          />
        </div>
        <InfoText
          model={model}
          fieldName={fieldName}
          field={field}
          errorMessage={getErrorMessage()}
        />
      </InputContainer>
    );
  }

  return (
    <InputContainer className={className} fieldName={fieldName}>
      <div className={"d-flex w-100"}>
        <FieldLabel
          field={field}
          fieldName={fieldName}
          showLabel={showFieldLabel !== false}
        />
        <div className={fieldClassName}>
          {getTagDisplayer()}
        </div>
        <InlineInputEditIcon
          visible={disabled !== true && inEditMode === false}
          disabled={disabled}
          handleEditFunction={() => setInEditMode(true)}
        />
      </div>
    </InputContainer>
  );
}

InlineTagManagerInput.propTypes = {
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  type: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  showInputLabel: PropTypes.bool,
  allowedTypes: PropTypes.array,
  getDisabledTags: PropTypes.func,
  placeholderText: PropTypes.string,
  excludeTypes: PropTypes.array,
  className: PropTypes.string,
  fieldClassName: PropTypes.string,
  handleSaveFunction: PropTypes.func,
  visible: PropTypes.bool,
  showFieldLabel: PropTypes.bool,
};

InlineTagManagerInput.defaultProps = {
  allowCreate: "onFilter",
  fieldName: "tags",
  inline: false,
  placeholderText: "Select Tags"
};
