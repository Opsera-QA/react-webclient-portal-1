import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn, getUppercaseTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineTaskDetailViewer from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineInstructionsAcknowledgementOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";
import pipelineActivityMetadata from "@opsera/definitions/constants/pipelines/logs/pipelineActivity.metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import StepApprovalOverlay from "components/workflow/StepApprovalOverlay";

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
  const toastContext = useContext(DialogToastContext);
  const fields = pipelineActivityMetadata?.fields;
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
    const currentStepId = DataParsingHelper.parseNestedMongoDbId(pipeline, "workflow.last_step.step_id");

    if (
      isPaused === true
      && isPendingRow === true
      && pipelineRunCount === selectedRowRunCount
      && rowStepId === currentStepId
    ) {
      const parsedPipelineStepToolIdentifier = PipelineHelpers.getPendingApprovalStepToolIdentifier(pipeline);
      switch (parsedPipelineStepToolIdentifier) {
        // case toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL:
        //   toastContext.showOverlayPanel(
        //     <StepApprovalOverlay
        //       pipelineId={pipeline?._id}
        //       loadPipelineFunction={loadPipelineFunction}
        //     />,
        //   );
        //   return;
        case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
          toastContext.showOverlayPanel(
            <PipelineInstructionsAcknowledgementOverlay
              pipeline={pipeline}
              loadPipelineFunction={loadPipelineFunction}
            />,
          );
          return;
      }
    }

    toastContext.showOverlayPanel(
      <PipelineTaskDetailViewer
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
  pipelineActivityMetadata: PropTypes.object,
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