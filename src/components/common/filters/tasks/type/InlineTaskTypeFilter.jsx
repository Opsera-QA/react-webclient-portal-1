import React from "react";
import PropTypes from "prop-types";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";

function InlineTaskTypeFilter({ filterModel, setFilterModel, className, fieldName, loadData}) {
  const setDataFunction = (fieldName, value) => {
    let newModel = filterModel;
    newModel.setData(fieldName, value);
    newModel.setData("category", "");
    loadData(newModel);
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
  fieldName: "type"
};

export default InlineTaskTypeFilter;


