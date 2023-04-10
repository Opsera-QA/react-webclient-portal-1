import React, {useCallback} from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import useGetCustomerTags from "hooks/settings/tags/useGetCustomerTags";
import useGetWorkspaceTags from "hooks/workspace/tags/useGetWorkspaceTags";
import {workspaceConstants} from "components/workspace/workspace.constants";

export default function WorkspaceTagFilter(
  {
    filterModel,
    setFilterModel,
    fieldName,
    className,
  }) {
  const {
    isLoading,
    allTags,
    toolTags,
    taskTags,
    pipelineTags,
    error,
    loadDataFunction,
  } = useGetWorkspaceTags();
  const type = filterModel?.getData("type");

  const getTagsForType = useCallback(() => {
    switch (type) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return pipelineTags;
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return taskTags;
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL:
        return toolTags;
      case workspaceConstants.WORKSPACE_ITEM_TYPES.ALL:
      default:
        return allTags;
    }
  }, [type, allTags, toolTags, taskTags, pipelineTags]);

  const getTextFieldString = (tag) => {
    if (tag == null) {
      return "Select Tag";
    }

    return `${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`;
  };

  const setDataFunction = (fieldName, tag) => {
    filterModel.setData(fieldName, tag);
    setFilterModel({...filterModel});
  };

  return (
    <div className={className}>
      <FilterSelectInputBase
        fieldName={fieldName}
        busy={isLoading}
        placeholderText={"Filter by Tag"}
        groupBy={(tag) => capitalizeFirstLetter(tag?.type, " ", "Undefined Type")}
        setDataObject={setFilterModel}
        setDataFunction={setDataFunction}
        dataObject={filterModel}
        textField={getTextFieldString}
        selectOptions={getTagsForType()}
        error={error}
        loadDataFunction={loadDataFunction}
      />
    </div>
  );
}

WorkspaceTagFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
};

WorkspaceTagFilter.defaultProps = {
  fieldName: "tag",
};
