import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
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
    <SummaryPanelContainer>
      <Row>
        <Col md={12}>
          {getBody()}
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TaskActivityConsoleLogPanel.propTypes = {
  logRecord: PropTypes.object,
};


export default TaskActivityConsoleLogPanel;
