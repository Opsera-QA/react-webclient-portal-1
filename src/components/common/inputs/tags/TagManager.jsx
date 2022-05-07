import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import {capitalizeFirstLetter, hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";
import {fieldValidation} from "core/data_model/modelValidation";

function TagManager({ fieldName, type, dataObject, setDataObject, disabled, setDataFunction, allowCreate, inline, allowedTypes, getDisabledTags, placeholderText}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [tagOptions, setTagOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTags(cancelSource);
      await removeOldTags();
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load tags.");
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTags = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelSource);
    let tags = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(tags) && tags.length > 0)
    {
      loadTagOptions(tags);
    }
  };

  const removeOldTags = async () => {
    let newTags = [];

    dataObject.getArrayData(fieldName).map((tag, index) => {
      if (tag["type"] != null && tag["type"] !== "" && tag["value"] != null && tag["value"] !== "")
      {
        let tagOption = {type: tag["type"], value: tag["value"]};
        newTags.push(tagOption);
      }
    });
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, newTags);

    if (isMounted?.current === true) {
      setDataObject({...newDataObject});
    }
  };

  const saveNewTag = async (newTagDto) => {
    try {
      await adminTagsActions.createTagV2(getAccessToken, cancelTokenSource, newTagDto);
    }
    catch (error) {
      toastContext.showCreateFailureResultDialog("Tag");
    }
  };

  const loadTagOptions = (tags) => {
    let currentOptions = [];

    tags.map((tag) => {
      let tagOption = {type: tag["type"], value: tag["value"]};

      if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
        if (allowedTypes.includes(tagOption.type)) {
          currentOptions.push(tagOption);
        }
      }
      else {
        if (!dataObject.getArrayData(fieldName).some(item => item.type === tagOption.type && item.value === tagOption.value)) {
          currentOptions.push(tagOption);
        }     
      }
    });

    if (isMounted?.current === true) {
      setTagOptions(currentOptions);
    }
  };

  const validateAndSetData = (fieldName, value) => {
    const errors = fieldValidation(value, dataObject, field);

    if (Array.isArray(errors) && errors.length > 0) {
      setErrorMessage(errors[0]);
      return;
    }

    setErrorMessage("");
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);

    if (isMounted?.current === true) {
      setDataObject({...newDataObject});
    }
  };

  const getExistingTag = (newTag) => {
    return tagOptions.find(tag => tag.type === type && tag.value === newTag);
  };

  const tagAlreadySelected = (newTag) => {
    let currentValues = dataObject.getData(fieldName);
    return currentValues != null && currentValues.length !== 0 && currentValues.find(tag => tag.type === type && tag.value === newTag) != null;
  };

  const handleCreate = async (newValue) => {
    let currentValues = dataObject.getData(fieldName);
    let existingTag = getExistingTag(newValue);

    if (existingTag != null)
    {
      let tagSelected = tagAlreadySelected(newValue);
      if (!tagSelected)
      {
        currentValues.push(existingTag);
        validateAndSetData(fieldName, currentValues);
      }
      return;
    }

    newValue = newValue.trim();
    newValue = newValue.replaceAll(' ', '-');
    newValue = newValue.replace(/[^A-Za-z0-9-.]/gi, '');
    newValue = newValue.toLowerCase();

    let currentOptions = [...tagOptions];
    let newTag = {type: type, value: newValue, active: true, configuration: {}};
    let newTagOption = {type: type, value: newValue};
    let newTagDto = new Model(newTag, tagMetadata, true);
    await saveNewTag(newTagDto);
    currentValues.push(newTagOption);
    currentOptions.push(newTagOption);

    if (isMounted?.current === true) {
      setTagOptions(currentOptions);
      validateAndSetData(fieldName, currentValues);
    }
  };

  if (type == null) {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      {!inline && <InputLabel model={dataObject} field={field} className={inline ? "mt-1 mr-2" : undefined}/>}
      <div className={"custom-multiselect-input"}>
        <StandaloneMultiSelectInput
          hasErrorState={hasStringValue(errorMessage)}
          selectOptions={[...tagOptions]}
          textField={(data) => capitalizeFirstLetter(data["type"]) + ": " + capitalizeFirstLetter(data["value"])}
          allowCreate={allowCreate}
          groupBy={(tag) => capitalizeFirstLetter(tag?.type, " ", "Undefined Type")}
          className={inline ? `inline-filter-input inline-select-filter` : undefined}
          busy={isLoading}
          manualEntry={true}
          createOptionFunction={(value) => handleCreate(value)}
          value={[...dataObject?.getArrayData(fieldName)]}
          placeholderText={errorMessage ? errorMessage : placeholderText}
          disabled={disabled || isLoading || (getDisabledTags && getDisabledTags(tagOptions))}
          setDataFunction={(tag) => setDataFunction ? setDataFunction(field.id, tag) : validateAndSetData(field.id, tag)}
        />
      </div>
      <InfoText
        fieldName={fieldName}
        model={dataObject}
        field={field}
        errorMessage={errorMessage}
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
  placeholderText: PropTypes.string
};

TagManager.defaultProps = {
  allowCreate: "onFilter",
  fieldName: "tags",
  inline: false,
  placeholderText: "Select Tags"
};

export default TagManager;