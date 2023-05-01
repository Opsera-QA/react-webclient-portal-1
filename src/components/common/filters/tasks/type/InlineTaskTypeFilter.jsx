import React from "react";
import PropTypes from "prop-types";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import {isTaskTypeOfCategory} from "components/tasks/task.types";

function InlineTaskTypeFilter(
  {
    filterModel,
    setFilterModel,
    className,
    fieldName,
    loadData,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newTaskType = selectedOption?.value;
    filterModel.setData(fieldName, newTaskType);
    const currentCategory = filterModel?.getData("category");

    if (isTaskTypeOfCategory(newTaskType, currentCategory) !== true) {
      filterModel.setData("category", "");
    }

    filterModel.setData("currentPage", 1);
    loadData(filterModel);
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <TaskTypeFilter
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

InlineTaskTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
};

InlineTaskTypeFilter.defaultProps = {
  fieldName: "type",
};

export default InlineTaskTypeFilter;


