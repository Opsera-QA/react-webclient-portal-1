import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'
import adminTagsActions from "../../../settings/tags/admin-tags-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import tagEditorMetadata, {defaultTags} from "../../../settings/tags/tags-form-fields";
import Model from "../../../../core/data_model/model";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function DtoTagManagerInput({ fieldName, type, dataObject, setDataObject, disabled, filter, placeholderText, setDataFunction, allowCreate, groupBy}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setComponentLoading(true);
      await getTags();
      await removeOldTags();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog("Could not load tags.");
    }
    finally {
      setComponentLoading(false);
    }
  }

  const getTags = async () => {
    const response = await adminTagsActions.getTags(getAccessToken);
    let tags = response.data.data;

    if (tags && tags.length > 0)
    {
      loadTagOptions(tags);
    }
  };

  const removeOldTags = async () => {
    let newTags = [];
    dataObject.getData(fieldName).map((tag, index) => {
      if (tag["type"] != null && tag["type"] !== "" && tag["value"] != null && tag["value"] !== "")
      {
        let tagOption = {type: tag["type"], value: tag["value"]};
        newTags.push(tagOption);
      }
    });
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, newTags);
    setDataObject({...newDataObject});
  }

  const saveNewTag = async (newTagDto) => {
    try {
      let createTagResponse = await adminTagsActions.create(newTagDto, getAccessToken);
    }
    catch (error) {
      toastContext.showCreateFailureResultDialog("Tag");
    }
  };

  const loadTagOptions = (tags) => {
    let currentOptions = [...defaultTags];
    tags.map((tag, index) => {
      let tagOption = {type: tag["type"], value: tag["value"]};
      currentOptions.push(tagOption);
    });

    setTagOptions(currentOptions);
  }

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
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
    newValue = newValue.toLowerCase();

    let currentOptions = [...tagOptions];
    let newTag = {type: type, value: newValue, active: true, configuration: {}};
    let newTagOption = {type: type, value: newValue};
    let newTagDto = new Model(newTag, tagEditorMetadata, true);
    await saveNewTag(newTagDto);
    currentValues.push(newTagOption);
    currentOptions.push(newTagOption);
    setTagOptions(currentOptions);
    validateAndSetData(fieldName, currentValues);
  };

  if (type == null)
  {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }

    return (
      field && type &&
      <>
        <div className="form-group custom-multiselect-input m-2">
          <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
          <Multiselect
            data={[...tagOptions]}
            textField={data => data["type"] + ": " + data["value"]}
            filter={filter}
            allowCreate={allowCreate}
            groupBy={groupBy}
            busy={componentLoading}
            onCreate={value => handleCreate(value)}
            value={[...dataObject.getData(fieldName)]}
            placeholder={placeholderText}
            disabled={disabled}
            onChange={tag => setDataFunction ? setDataFunction(field.id, tag) : validateAndSetData(field.id, tag)}
          />
          {/*<div className="invalid-feedback">*/}
          {/*  <div>{errorMessage}</div>*/}
          {/*</div>*/}
          <small className="form-text text-muted">
            <div>{field.formText}</div>
          </small>
        </div>
      </>
    );
}

DtoTagManagerInput.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  filter: PropTypes.string,
  type: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.string,
  disabled: PropTypes.bool
};

DtoTagManagerInput.defaultProps = {
  filter: "contains",
  allowCreate: "onFilter",
  disabled: false,
  groupBy: "type"
}

export default DtoTagManagerInput;