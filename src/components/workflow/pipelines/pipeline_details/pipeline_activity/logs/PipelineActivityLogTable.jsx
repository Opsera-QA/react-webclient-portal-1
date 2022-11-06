import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn, getUppercaseTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineTaskDetailViewer from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import PaginationHelper from "@opsera/persephone/helpers/array/pagination.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineInstructionsAcknowledgementOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";

function PipelineActivityLogTable(
  {
    pipelineLogData,
    pipelineActivityMetadata,
    pipeline,
    pipelineActivityFilterDto,
    currentRunNumber,
    currentStepId,
    loadPipelineFunction,
  }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [columns, setColumns] = useState([]);
  const latestId = PaginationHelper.getLatestCreatedItemInDataArray(pipelineLogData)?._id;

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(pipelineActivityMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineActivityMetadata)]);

  const onRowSelect = (treeGrid, row) => {
    const selectedRowRunCount = DataParsingHelper.parseInteger(row?.run_count);
    const pipelineRunCount = DataParsingHelper.parseNestedInteger(pipeline, "workflow.run_count", 0);
    const isPendingRow = DataParsingHelper.parseNestedString(row, "status") === "pending";

    if (isPendingRow === true && pipelineRunCount === selectedRowRunCount) {
      const parsedPipelineStepToolIdentifier = PipelineHelpers.getPendingApprovalStepToolIdentifier(pipeline);
      switch (parsedPipelineStepToolIdentifier) {
        case toolIdentifierConstants.TOOL_IDENTIFIERS.APPROVAL:
          break;
        case toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION:
          toastContext.showOverlayPanel(
            <PipelineInstructionsAcknowledgementOverlay
              pipeline={pipeline}
              loadDataFunction={loadPipelineFunction}
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

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getUppercaseTableTextColumn(fields.find(field => { return field.id === "step_name";})),
          getUppercaseTableTextColumn(fields.find(field => { return field.id === "action";})),
          getTableTextColumn(fields.find(field => { return field.id === "message";})),
          getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
          getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
        ]
      );
    }
  };

  const rowStyling = (row) => {
    const isFinalRow = row?._id === latestId;

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
    if (currentRunNumber == null || currentRunNumber === "latest" || currentRunNumber === "secondary" || currentStepId == null) {
      return pipelineLogData;
    }

    return pipelineLogData.filter((item) => {
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
      // rowStyling={rowStyling}
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
};

export default PipelineActivityLogTable;