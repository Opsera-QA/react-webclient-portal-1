import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import { faBallotCheck } from "@fortawesome/pro-light-svg-icons";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getOwnerNameField, getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import PipelineInstructionsRoleHelper
  from "@opsera/know-your-role/roles/settings/pipelines/instructions/pipelineInstructionsRole.helper";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION,
} from "components/common/table/FilterContainer";
import NewPipelineInstructionsOverlay from "components/workflow/instructions/NewPipelineInstructionsOverlay";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";
import pipelineInstructionsMetadata
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructions.metadata";
import pipelineInstructionsTypeConstants
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructionsType.constants";
import InlinePipelineInstructionsTypeFilter
  from "components/common/filters/pipelines/instructions/InlinePipelineInstructionsTypeFilter";
import pipelineInstructionsStatusConstants
  from "@opsera/definitions/constants/pipelines/instructions/status/pipelineInstructionsStatus.constants";
import PipelineInstructionsFilterOverlay
  from "components/workflow/instructions/filter_overlay/PipelineInstructionsFilterOverlay";

export default function PipelineInstructionsTable(
  {
    pipelineInstructions,
    loadData,
    isLoading,
    pipelineInstructionsFilterModel,
    setPipelineInstructionsFilterModel,
  }) {
  const history = useHistory();
  const fields = pipelineInstructionsMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getOwnerNameField(),
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "type"),
        pipelineInstructionsTypeConstants.getPipelineInstructionTypeLabel,
        "no-wrap-inline",
      ),
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "attributes.status"),
        pipelineInstructionsStatusConstants.getPipelineInstructionStatusLabel,
        "no-wrap-inline",
      ),
      getTableDateColumn(
        getField(fields, "attributes.release_date"),
      ),
    ],
    []
  );
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const createPipelineInstructions = () => {
    toastContext.showOverlayPanel(
      <NewPipelineInstructionsOverlay
        loadData={loadData}
      />
    );
  };

  const handleRowSelectFunction = (row, data) => {
    history.push(pipelineInstructionsHelper.getDetailViewLink(data?._id));
  };

  const getTable = () => {
    return (
      <CustomTable
        nextGeneration={true}
        columns={columns}
        data={pipelineInstructions}
        isLoading={isLoading}
        onRowSelect={handleRowSelectFunction}
        paginationDto={pipelineInstructionsFilterModel}
        setPaginationDto={setPipelineInstructionsFilterModel}
        loadData={loadData}
      />
    );
  };

  const getFilterSelectionOverlayPanel = () => {
    return (
      <PipelineInstructionsFilterOverlay
        pipelineInstructionsFilterModel={pipelineInstructionsFilterModel}
        loadDataFunction={loadData}
      />
    );
  };

  const getInlineFilters =  () => {
    return (
      <InlinePipelineInstructionsTypeFilter
        filterModel={pipelineInstructionsFilterModel}
        setFilterModel={setPipelineInstructionsFilterModel}
        loadData={loadData}
        className={"mr-2"}
      />
    );
  };

  const getAddRecordFunction = () => {
    const addAllowed = PipelineInstructionsRoleHelper.canCreatePipelineInstructions(userData);

    if (addAllowed === true) {
      return createPipelineInstructions;
    }
  };

  return (
    <VanityDataContainer
      loadData={loadData}
      addRecordFunction={getAddRecordFunction()}
      paginationModel={pipelineInstructionsFilterModel}
      setPaginationModel={setPipelineInstructionsFilterModel}
      isLoading={isLoading}
      inlineFilters={getInlineFilters()}
      body={getTable()}
      filterSelectionOverlayPanel={getFilterSelectionOverlayPanel()}
      metadata={pipelineInstructionsMetadata}
      titleIcon={faBallotCheck}
      title={"Pipeline Instructions"}
      type={"Pipeline Instructions"}
      className={"px-2 pb-2"}
      minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      maximumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      launchFilterOverlay={true}
    />
  );
}

PipelineInstructionsTable.propTypes = {
  pipelineInstructions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  pipelineInstructionsFilterModel: PropTypes.object,
  setPipelineInstructionsFilterModel: PropTypes.func,
};