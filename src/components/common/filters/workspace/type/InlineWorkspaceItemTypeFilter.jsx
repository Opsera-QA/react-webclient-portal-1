import React from "react";
import PropTypes from "prop-types";
import WorkspaceItemTypeFilter from "components/common/filters/workspace/type/WorkspaceItemTypeFilter";

export default function InlineWorkspaceItemTypeFilter(
  {
    filterModel,
    setFilterModel,
    className,
    fieldName,
    loadData,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    filterModel?.setData(fieldName, selectedOption?.value);
    loadData(filterModel);
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <WorkspaceItemTypeFilter
      className={className}
      fieldName={fieldName}
      inline={true}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

InlineWorkspaceItemTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
};

InlineWorkspaceItemTypeFilter.defaultProps = {
  fieldName: "type",
};


