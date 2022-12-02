import React from "react";
import PropTypes from "prop-types";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import PipelineInstructionsTypeFilter
  from "components/common/filters/pipelines/instructions/PipelineInstructionsTypeFilter";
import PipelineInstructionsStatusFilterSelectInput
  from "components/common/list_of_values_input/workflow/instructions/status/PipelineInstructionsStatusFilterSelectInput";
import NewDateRangeInput from "components/common/inputs/date/range/NewDateRangeInput";
import FilterSelectionOverlayContainer from "components/common/filters/buttons/FilterSelectionOverlayContainer";

export default function PipelineInstructionsFilterOverlay(
  {
    loadDataFunction,
    pipelineInstructionsFilterModel,
    setPipelineInstructionsFilterModel,
  }) {
  if (pipelineInstructionsFilterModel == null || setPipelineInstructionsFilterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <FilterSelectionOverlayContainer
      filterModel={pipelineInstructionsFilterModel}
      loadDataFunction={loadDataFunction}
    >
      <div className={"d-flex"}>
        <div className={"mr-3"}>
          <NewDateRangeInput
            model={pipelineInstructionsFilterModel}
            setModel={setPipelineInstructionsFilterModel}
            fieldName={"release_date_range"}
          />
        </div>
        <div className={"w-100 my-2"}>
          <PipelineInstructionsTypeFilter
            filterModel={pipelineInstructionsFilterModel}
            setFilterModel={setPipelineInstructionsFilterModel}
            className={"my-2"}
          />
          <TagFilter
            filterDto={pipelineInstructionsFilterModel}
            setFilterDto={setPipelineInstructionsFilterModel}
            valueField={"value2"}
            className={"my-2"}
          />
          <OwnerFilter
            filterModel={pipelineInstructionsFilterModel}
            setFilterModel={setPipelineInstructionsFilterModel}
            className={"my-2"}
          />
          <PipelineInstructionsStatusFilterSelectInput
            filterModel={pipelineInstructionsFilterModel}
            setFilterModel={setPipelineInstructionsFilterModel}
            className={"my-2"}
          />
        </div>
      </div>
    </FilterSelectionOverlayContainer>
  );
}

PipelineInstructionsFilterOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  pipelineInstructionsFilterModel: PropTypes.object,
  setPipelineInstructionsFilterModel: PropTypes.func,
};