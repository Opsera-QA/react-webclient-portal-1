import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineTaskDetailViewer from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineActivityLogTable(
  {
    pipelineLogData,
    pipelineActivityMetadata,
    isLoading,
    pipeline,
    pipelineActivityFilterDto,
  }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(pipelineActivityMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineActivityMetadata)]);

  const onRowSelect = (treeGrid, row) => {
    toastContext.showOverlayPanel(
      <PipelineTaskDetailViewer
        pipelineName={pipeline?.name}
        pipelineActivityLogId={row._id}
      />
    );
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getTableTextColumn(fields.find(field => { return field.id === "step_name";})),
          getTableTextColumn(fields.find(field => { return field.id === "action";})),
          getTableTextColumn(fields.find(field => { return field.id === "message";})),
          getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
          getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
        ]
      );
    }
  };

  const getFilteredData = () => {
    const currentRunNumber = pipelineActivityFilterDto?.getData("currentRunNumber");
    const currentStepName = pipelineActivityFilterDto?.getData("currentStepName");

    if (currentRunNumber == null || currentRunNumber === "latest" || currentRunNumber === "secondary") {
      return pipelineLogData;
    }

    return pipelineLogData.filter((item) => {
      return item.run_count === currentRunNumber && (currentStepName == null || item.step_name === currentStepName);
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
    />
  );
}

PipelineActivityLogTable.propTypes = {
  pipelineLogData: PropTypes.array,
  pipelineActivityMetadata: PropTypes.object,
  isLoading: PropTypes.bool,
  pipeline: PropTypes.object,
  pipelineActivityFilterDto: PropTypes.object,
};

export default PipelineActivityLogTable;