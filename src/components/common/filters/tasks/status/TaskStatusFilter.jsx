import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

export const TASK_STATUSES = [
  {text: "All", value: ""},
  {text: "Success", value: "success"},
  {text: "Failed", value: "failed"},
  {text: "Stopped", value: "stopped"},
  {text: "Running", value: "running"},
];

function TaskStatusFilter({ filterModel, setFilterModel, setDataFunction, className, fieldName, inline}) {
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
      placeholderText={"Select Task Status"}
      dataObject={filterModel}
      selectOptions={TASK_STATUSES}
    />
  );
}

TaskStatusFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

TaskStatusFilter.defaultProps = {
  fieldName: "status"
};

export default TaskStatusFilter;


