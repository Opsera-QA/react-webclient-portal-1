import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import adminTagsActions from "../../settings/tags/admin-tags-actions";
import Model from "../../../core/data_model/model";
import LoadingDialog from "../status_notifications/loading";
import {AuthContext} from "contexts/AuthContext";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";

// TODO: Don't use this besides in pipeline summary editors. It's a temp component until I can wire up my new ones
function TempTagManagerInput({ label, data, setDataFunction, disabled, filter, placeholderText, allowCreate, groupBy}) {
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
    setDataFunction(newTags);
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
    return tagOptions.find(tag => tag.type === "pipeline" && tag.value === newTag);
  };

  const tagAlreadySelected = (newTag) => {
    let currentValues = data;
    return currentValues != null && currentValues.length !== 0 && currentValues.find(tag => tag.type === "pipeline" && tag.value === newTag) != null;
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
        setDataFunction(currentValues);
      }
      return;
    }

    newValue = newValue.trim();
    newValue = newValue.replaceAll(' ', '-');
    newValue = newValue.replace(/[^A-Za-z0-9-.]/gi, '');
    newValue = newValue.toLowerCase();

    let currentOptions = [...tagOptions];
    let newTag = {type: "pipeline", value: newValue, active: true, configuration: {}};
    let newTagOption = {type: "pipeline", value: newValue};
    let newTagDto = new Model(newTag, tagMetadata, true);
    await saveNewTag(newTagDto);
    currentValues.push(newTagOption);
    currentOptions.push(newTagOption);
    setTagOptions(currentOptions);
    setDataFunction(currentValues);
  };

  return (
    <div className="form-group m-2">
      <label><span>{label}</span></label>
      <StandaloneMultiSelectInput
        selectOptions={[...tagOptions]}
        textField={data => data["type"] + ": " + data["value"]}
        filter={filter}
        allowCreate={allowCreate}
        manualEntry={true}
        groupBy={groupBy}
        busy={componentLoading}
        createOptionFunction={handleCreate}
        value={[...data]}
        placeholderText={placeholderText}
        disabled={disabled}
        setDataFunction={setDataFunction}
      />
    </div>
  );
}

TempTagManagerInput.propTypes = {
  label: PropTypes.string,
  selectOptions: PropTypes.array,
  data: PropTypes.object,
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
  allowCreate: "onFilter",
  disabled: false,
  groupBy: "type"
};

export default TempTagManagerInput;