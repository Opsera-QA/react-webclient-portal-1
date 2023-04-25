import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import TaskTypeFilter from "components/common/filters/tasks/type/TaskTypeFilter";
import TaskStatusFilter from "components/common/filters/tasks/status/TaskStatusFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";

export default function TaskFilterOverlay(
  {
    loadDataFunction,
    taskFilterModel,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    setFilterModel(taskFilterModel?.clone());
  }, [taskFilterModel]);


  if (filterModel == null || setFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <TaskTypeFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <TaskStatusFilter
        className={"mb-2"}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
      <ActiveFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
        className="mb-2"
        fieldName={"active"}
      />
      <TagFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
      />
    </FilterSelectionOverlayContainer>
  );
}

TaskFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  taskFilterModel: PropTypes.object,
};