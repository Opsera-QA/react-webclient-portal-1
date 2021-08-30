import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets';
import {AuthContext} from "../../../contexts/AuthContext";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import adminTagsActions from "../../settings/tags/admin-tags-actions";
import Model from "../../../core/data_model/model";
import LoadingDialog from "../status_notifications/loading";

// TODO: Don't use this besides in pipeline summary editors. It's a temp component until I can wire up my new ones
function TempTagManagerInput({ label, type, data, setData, disabled, filter, placeholderText, allowCreate, groupBy}) {
  const { getAccessToken } = useContext(AuthContext);
  const [tagOptions, setTagOptions] = useState([]);
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setComponentLoading(true);
    await getTags();
    removeOldTags();
    setComponentLoading(false);
  };

  const removeOldTags = () => {
    let newTags = [];
    data.map((tag, index) => {
      if (tag["type"] != null && tag["type"] !== "" && tag["value"] != null && tag["value"] !== "")
      {
        let tagOption = {type: tag["type"], value: tag["value"]};
        newTags.push(tagOption);
      }
    });
    setData(newTags);
  };

  const getTags = async () => {
    const response = await adminTagsActions.getAllTags(getAccessToken);
    let tags = response.data.data;

    if (tags && tags.length > 0)
    {
      loadTagOptions(tags);
    }
  };

  const saveNewTag = async (newTagDto) => {
    let createTagResponse = await adminTagsActions.create(newTagDto, getAccessToken);
  };

  const loadTagOptions = (tags) => {
    let currentOptions = [];
    tags.map((tag, index) => {
      if (tag["type"] != null && tag["type"] !== "" && tag["value"] != null && tag["value"] !== "")
      {
        let tagOption = {type: tag["type"], value: tag["value"]};
        currentOptions.push(tagOption);
      }
    });

    setTagOptions(currentOptions);
  };

  const getExistingTag = (newTag) => {
    return tagOptions.find(tag => tag.type === type && tag.value === newTag);
  };

  const tagAlreadySelected = (newTag) => {
    let currentValues = data;
    return currentValues != null && currentValues.length !== 0 && currentValues.find(tag => tag.type === type && tag.value === newTag) != null;
  };

  const handleCreate = async (newValue) => {
    let currentValues = data;
    let existingTag = getExistingTag(newValue);

    if (existingTag != null)
    {
      let tagSelected = tagAlreadySelected(newValue);
      if (!tagSelected)
      {
        currentValues.push(existingTag);
        setData(currentValues);
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
    let newTagDto = new Model(newTag, tagEditorMetadata, true);
    await saveNewTag(newTagDto);
    currentValues.push(newTagOption);
    currentOptions.push(newTagOption);
    setTagOptions(currentOptions);
    setData(currentValues);
  };

  if (componentLoading) {
    return <LoadingDialog size="sm"/>;
  }

  if (type == null)
  {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }
  else {
    return (
      type &&
      <>
        <div className="form-group custom-multiselect-input m-2">
          <label><span>{label}</span></label>
          <Multiselect
            data={[...tagOptions]}
            textField={data => data["type"] + ": " + data["value"]}
            filter={filter}
            allowCreate={allowCreate}
            groupBy={groupBy}
            busy={componentLoading}
            onCreate={value => handleCreate(value)}
            containerClassName={"tag-input"}
            value={[...data]}
            placeholder={placeholderText}
            disabled={disabled}
            onChange={tags => setData(tags)}
          />
        </div>
      </>
    );
  }
}

TempTagManagerInput.propTypes = {
  label: PropTypes.string,
  selectOptions: PropTypes.array,
  data: PropTypes.object,
  setData: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  filter: PropTypes.string,
  type: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.string,
  disabled: PropTypes.bool
};

TempTagManagerInput.defaultProps = {
  filter: "contains",
  allowCreate: "onFilter",
  disabled: false,
  groupBy: "type"
};

export default TempTagManagerInput;