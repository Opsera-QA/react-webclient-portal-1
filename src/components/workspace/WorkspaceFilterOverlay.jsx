import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import WorkspaceTagFilter from "components/workspace/views/filters/WorkspaceTagFilter";
import ActiveFilter from "components/common/filters/status/ActiveFilter";

export default function WorkspaceFilterOverlay(
  {
    loadDataFunction,
    workspaceFilterModel,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    setFilterModel(workspaceFilterModel?.clone());
  }, [workspaceFilterModel]);


  if (filterModel == null || setFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <WorkspaceTagFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <ActiveFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
        fieldName={"active"}
        className={"mb-2"}
      />
      <OwnerFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-3"}
      />
    </FilterSelectionOverlayContainer>
  );
}

WorkspaceFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
};