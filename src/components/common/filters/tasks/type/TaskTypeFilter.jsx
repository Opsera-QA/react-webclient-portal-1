import React, { useContext } from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import {
  getNonProductionTaskTypesForCategory,
  getProductionTaskTypesForCategory,
} from "components/tasks/task.types";

function TaskTypeFilter({ filterModel, setFilterModel, setDataFunction, className, fieldName, inline }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

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
      groupBy={"category"}
      placeholderText={"Select Task Type"}
      valueField={"value"}
      dataObject={filterModel}
      selectOptions={
        featureFlagHideItemInProd() !== false
          ? getProductionTaskTypesForCategory(filterModel?.getData("category"))
          : getNonProductionTaskTypesForCategory(filterModel?.getData("category"))
      }
    />
  );
}

TaskTypeFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  inline: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

TaskTypeFilter.defaultProps = {
  fieldName: "type",
};

export default TaskTypeFilter;


