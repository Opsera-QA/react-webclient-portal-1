import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import { workspaceConstants } from "components/workspace/workspace.constants";

export default function WorkspaceItemTypeFilter(
  {
    filterModel,
    setFilterModel,
    setDataFunction,
    className,
    fieldName,
    inline,
    disabled,
  }) {
  if (filterModel == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      fieldName={fieldName}
      inline={inline}
      setDataObject={setFilterModel}
      setDataFunction={setDataFunction}
      placeholderText={"Select Task Type"}
      dataObject={filterModel}
      selectOptions={workspaceConstants.WORKSPACE_TYPE_SELECT_OPTIONS}
      disabled={disabled}
    />
  );
}

WorkspaceItemTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

WorkspaceItemTypeFilter.defaultProps = {
  fieldName: "type",
};


