import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";

export default function ToolFilterOverlay(
  {
    loadDataFunction,
    toolFilterModel,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    setFilterModel(toolFilterModel?.clone());
  }, [toolFilterModel]);


  if (filterModel == null || setFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <ActiveFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
        className={"mb-2"}
      />
      <OwnerFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <TagFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
      />
    </FilterSelectionOverlayContainer>
  );
}

ToolFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  toolFilterModel: PropTypes.object,
};