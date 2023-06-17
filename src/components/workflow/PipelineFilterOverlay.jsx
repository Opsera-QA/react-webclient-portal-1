import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import PipelineStepToolIdentifierFilter
  from "components/common/filters/tools/tool_identifier/pipelines/PipelineStepToolIdentifierFilter";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import PipelineTagFilter from "components/common/filters/tags/tag/pipelines/PipelineTagFilter";

export default function PipelineFilterOverlay(
  {
    loadDataFunction,
    pipelineFilterModel,
  }) {
  const [filterModel, setFilterModel] = useState(undefined);

  useEffect(() => {
    setFilterModel(pipelineFilterModel?.clone());
  }, [pipelineFilterModel]);


  if (filterModel == null || setFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={filterModel}
      loadDataFunction={loadDataFunction}
    >
      <PipelineStatusFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <PipelineStepToolIdentifierFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <PipelineTagFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        className={"mb-2"}
      />
      <OwnerFilter
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        visible={pipelineFilterModel?.getData("type") !== "owner"}
      />
    </FilterSelectionOverlayContainer>
  );
}

PipelineFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  pipelineFilterModel: PropTypes.object,
};