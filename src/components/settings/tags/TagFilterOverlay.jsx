import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import TagTypeFilter from "components/common/filters/tags/tag_type/TagTypeFilter";

export default function TagFilterOverlay(
  {
    loadDataFunction,
    tagFilterModel,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    setFilterModel(tagFilterModel?.clone());
  }, [tagFilterModel]);

  if (filterModel == null || setFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <TagTypeFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <ActiveFilter
        filterDto={filterModel}
        setFilterDto={setFilterModel}
      />
    </FilterSelectionOverlayContainer>
  );
}

TagFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  tagFilterModel: PropTypes.object,
};