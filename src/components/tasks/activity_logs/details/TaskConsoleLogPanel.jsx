import React from "react";
import PropTypes from "prop-types";
import PipelineConsoleLogField from "components/common/fields/log/PipelineConsoleLogField";
import ChunkedTaskLogField from "components/common/fields/log/tasks/ChunkedTaskLogField";

function TaskActivityConsoleLogPanel({ logRecord }) {
  const getBody = () => {
    if (logRecord?.type === "sfdc-bulk-migration") {
      return (
        <ChunkedTaskLogField
          logRecord={logRecord}
          taskId={logRecord?.task_id}
          runCount={logRecord?.run_count}
          logMetaRecordId={logRecord?.api_response?.logMetaRecordId}
        />
      );
    }

    return (
      <PipelineConsoleLogField
        apiResponse={logRecord?.api_response}
        dataObject={logRecord}
      />
    );
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

TaskActivityConsoleLogPanel.propTypes = {
  logRecord: PropTypes.object,
};


export default TaskActivityConsoleLogPanel;
