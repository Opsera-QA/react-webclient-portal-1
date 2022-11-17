import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {getField} from "components/common/metadata/metadata-helpers";
import { faBallotCheck } from "@fortawesome/pro-light-svg-icons";
import VanityDataContainer from "components/common/containers/VanityDataContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getOwnerNameField,
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

export default function PipelineInstructionTable(
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
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "type"),
        pipelineInstructionsTypeConstants.getPipelineInstructionTypeLabel,
        "no-wrap-inline",
      ),
      getOwnerNameField(),
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
      isLoading={isLoading}
      body={getTable()}
      metadata={pipelineInstructionsMetadata}
      titleIcon={faBallotCheck}
      title={"Pipeline Instructions"}
      type={"Pipeline Instructions"}
      className={"px-2 pb-2"}
      minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      maximumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
    />
  );
}

PipelineInstructionTable.propTypes = {
  pipelineInstructions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  pipelineInstructionsFilterModel: PropTypes.object,
  setPipelineInstructionsFilterModel: PropTypes.func,
};