import React from "react";
import PropTypes from "prop-types";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import {isTaskTypeOfCategory} from "components/tasks/task.types";

function InlineTaskTypeFilter({ filterModel, setFilterModel, className, fieldName, loadData}) {
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
    />
  );
}

InlineTaskTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
};

InlineTaskTypeFilter.defaultProps = {
  fieldName: "type",
};

export default InlineTaskTypeFilter;


