import React, {useContext} from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import {
  nonProductionTaskTypes,
  productionTaskTypes
} from "components/common/list_of_values_input/tasks/TaskTypeSelectInputBase";

function TaskTypeFilter({ filterModel, setFilterModel, setDataFunction, className, fieldName, inline}) {
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
      dataObject={filterModel}
      selectOptions={featureFlagHideItemInProd() !== false ? productionTaskTypes : nonProductionTaskTypes}
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
  fieldName: "type"
};

export default TaskTypeFilter;


