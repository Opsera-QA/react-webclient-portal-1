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

function TagManager(
  {
    fieldName,
    type,
    dataObject,
    setDataObject,
    disabled,
    setDataFunction,
    allowCreate,
    inline,
    allowedTypes,
    excludeTypes,
    getDisabledTags,
    placeholderText,
  }) {
  const toastContext = useContext(DialogToastContext);
  const field = dataObject?.getFieldById(fieldName);
  const [tagOptions, setTagOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
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
        if (!dataObject.getArrayData(fieldName).some(item => item.type === tagOption.type && item.value === tagOption.value)) {
          currentOptions.push(tagOption);
        }     
      }
    });

    setTagOptions(currentOptions);
  };

  const validateAndSetData = (fieldName, value) => {
    const errors = fieldValidation(value, dataObject, field);

    if (Array.isArray(errors) && errors.length > 0) {
      setErrorMessage(errors[0]);
      return;
    }

    setErrorMessage("");
    dataObject.setData(fieldName, value);
    setDataObject({...dataObject});
  };

  const getExistingTag = (newTag) => {
    return tagOptions.find(tag => tag.type === type && tag.value === newTag);
  };

  const tagAlreadySelected = (newTag) => {
    const currentValues = dataObject.getArrayData(fieldName);
    return currentValues != null && currentValues.length !== 0 && currentValues.find(tag => tag.type === type && tag.value === newTag) != null;
  };

  const handleCreate = async (newValue) => {
    const currentValues = dataObject.getData(fieldName);
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

  const getErrorMessage = () => {
    if (hasStringValue(internalErrorMessage) === true) {
      return internalErrorMessage;
    }

    if (hasStringValue(errorMessage) === true) {
      return errorMessage;
    }
  };

  const hasWarningState = () => {
    return field.noItemsWarning && dataObject?.getArrayData(fieldName)?.length === 0;
  };

  if (type == null && allowCreate !== false) {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        showLabel={inline !== true}
        model={dataObject}
        field={field}
        hasError={hasStringValue(errorMessage) === true}
        hasWarningState={hasWarningState()}
        disabled={disabled}
        isLoading={isLoading}
      />
      <div className={"custom-multiselect-input"}>
        <StandaloneMultiSelectInput
          hasErrorState={hasStringValue(errorMessage)}
          hasWarningState={hasWarningState()}
          selectOptions={[...tagOptions]}
          textField={(tag) => `${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`}
          allowCreate={hasStringValue(type) === true ? allowCreate : undefined}
          groupBy={(tag) => capitalizeFirstLetter(tag?.type, " ", "Undefined Type")}
          className={inline ? `inline-filter-input inline-select-filter` : undefined}
          busy={isLoading}
          manualEntry={true}
          createOptionFunction={(value) => handleCreate(value)}
          value={[...dataObject?.getArrayData(fieldName)]}
          placeholderText={internalPlaceholderText ? internalPlaceholderText : placeholderText}
          disabled={disabled || isLoading || (getDisabledTags && getDisabledTags(tagOptions))}
          setDataFunction={(tagArray) => setDataFunction ? setDataFunction(field.id, TagParsingHelper.parseTagArray(tagArray)) : validateAndSetData(field.id, TagParsingHelper.parseTagArray(tagArray))}
          fieldName={fieldName}
        />
      </div>
      <InfoText
        fieldName={fieldName}
        model={dataObject}
        field={field}
        errorMessage={getErrorMessage()}
      />
    </InputContainer>
  );
}

TagManager.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  type: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  allowedTypes: PropTypes.array,
  getDisabledTags: PropTypes.func,
  placeholderText: PropTypes.string,
  excludeTypes: PropTypes.array,
};

TagManager.defaultProps = {
  allowCreate: "onFilter",
  fieldName: "tags",
  inline: false,
  placeholderText: "Select Tags"
};

export default TagManager;