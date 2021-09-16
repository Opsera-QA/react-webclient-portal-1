import React from "react";
import PropTypes from "prop-types";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";

function InlineTaskStatusFilter({ filterModel, setFilterModel, className, fieldName, loadData}) {
  const setDataFunction = (fieldName, value) => {
    let newModel = filterModel;
    newModel.setData(fieldName, value);
    loadData(newModel);
  };

  if (filterModel == null) {
    return null;
  }

  return (
    <TaskStatusFilter
      className={className}
      fieldName={fieldName}
      inline={true}
      setFilterModel={setFilterModel}
      filterModel={filterModel}
      setDataFunction={setDataFunction}
    />
  );
}

InlineTaskStatusFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
};

InlineTaskStatusFilter.defaultProps = {
  fieldName: "status"
};

export default InlineTaskStatusFilter;


