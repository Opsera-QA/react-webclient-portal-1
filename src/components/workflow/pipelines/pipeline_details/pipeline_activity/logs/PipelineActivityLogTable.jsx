import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn, getUppercaseTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineActivityLogDetailViewOverlay from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogDetailViewOverlay";
import TableBase from "components/common/table/TableBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineInstructionsAcknowledgementOverlay
from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";
import pipelineActivityMetadata from "@opsera/definitions/constants/pipelines/logs/pipelineActivity.metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import StepApprovalOverlay from "components/workflow/StepApprovalOverlay";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineActivityLogTable(
  {
    pipelineLogData,
    pipeline,
    pipelineActivityFilterDto,
    currentRunNumber,
    currentStepId,
    loadPipelineFunction,
    latestPipelineLogId,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const fields = pipelineActivityMetadata?.fields;

  useEffect(() => {
  }, [pipelineLogData, latestPipelineLogId]);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "run_count"), "cell-center no-wrap-inline", 100,),
      getUppercaseTableTextColumn(getField(fields, "step_name")),
      getUppercaseTableTextColumn(getField(fields, "action")),
      getTableTextColumn(getField(fields, "message")),
      getPipelineActivityStatusColumn(getField(fields, "status")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
    ],
    [fields]
  );

  const onRowSelect = (treeGrid, row) => {
    const selectedRowRunCount = DataParsingHelper.parseInteger(row?.run_count);
    const pipelineRunCount = DataParsingHelper.parseNestedInteger(pipeline, "workflow.run_count", 0);
    const isPendingRow = DataParsingHelper.parseNestedString(row, "status") === "pending";
    const isPaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");
    const rowStepId = DataParsingHelper.parseNestedMongoDbId(row, "step_id");
    const pendingApprovalStep = DataParsingHelper.parseObject(pipelineHelpers.getPendingApprovalStep(pipeline), {});
    const approvalStepId = pendingApprovalStep?._id;

    if (
      isPaused === true
      && isPendingRow === true
      && pipelineRunCount === selectedRowRunCount
      && rowStepId === approvalStepId
    ) {
      const parsedPipelineStepToolIdentifier = DataParsingHelper.parseNestedString(pendingApprovalStep, "tool.tool_identifier");

      if (
        parsedPipelineStepToolIdentifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL
        || PipelineRoleHelper.canAuthorizeApprovalGate(userData, pipeline) === true
      ) {
        switch (parsedPipelineStepToolIdentifier) {
          case toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL:
            toastContext.showOverlayPanel(
              <StepApprovalOverlay
                pipelineId={pipeline?._id}
                setPipelineStarting={loadPipelineFunction}
              />,
            );
            return;
          case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
            toastContext.showOverlayPanel(
              <PipelineInstructionsAcknowledgementOverlay
                pipelineId={pipeline?._id}
                setPipelineStarting={loadPipelineFunction}
                pipelineActivityLogId={row._id}
              />,
            );
            return;
        }
      }
    }

    toastContext.showOverlayPanel(
      <PipelineActivityLogDetailViewOverlay
        pipelineName={pipeline?.name}
        pipelineActivityLogId={row._id}
      />,
    );
  };

  const rowStyling = (row) => {
    const isFinalRow = row?._id === latestPipelineLogId;

    if (isFinalRow) {
      const status = row?.status;

      switch (status) {
        case "failed":
        case "stopped":
        case "halted":
          return "failed-activity-row";
        case "success":
          return "success-activity-row";
        case "pending":
          return "pending-activity-row";
      }
    }
  };

  const getFilteredData = () => {
    if (currentRunNumber == null || currentRunNumber === "latest" || currentRunNumber === "secondary" || DataParsingHelper.isValidMongoDbId(currentStepId) !== true) {
      return pipelineLogData;
    }

    return pipelineLogData?.filter((item) => {
      return item.step_id === currentStepId;
    });
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  return (
    <TableBase
      columns={columns}
      data={getFilteredData()}
      noDataMessage={getNoDataMessage()}
      onRowSelect={onRowSelect}
      rowStyling={rowStyling}
    />
  );
}

PipelineActivityLogTable.propTypes = {
  pipelineLogData: PropTypes.array,
  pipeline: PropTypes.object,
  pipelineActivityFilterDto: PropTypes.object,
  currentRunNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currentStepId: PropTypes.string,
  loadPipelineFunction: PropTypes.func,
  latestPipelineLogId: PropTypes.string,
};

export default PipelineActivityLogTable;