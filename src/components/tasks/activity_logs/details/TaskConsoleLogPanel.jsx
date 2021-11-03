import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import PipelineConsoleLogField from "components/common/fields/log/PipelineConsoleLogField";
import GridFsLogField from "components/common/fields/log/GridFsLogField";

function TaskActivityConsoleLogPanel({ task }) {
  const getBody = () => {
    if (task?.api_response?.logRecordId) {
      return (
        <GridFsLogField
          gridFsLogRecordId={task?.api_response?.logRecordId}
        />
      );
    }

    return (
      <PipelineConsoleLogField
        apiResponse={task["api_response"]}
        dataObject={task}
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
  task: PropTypes.object,
};


export default TaskActivityConsoleLogPanel;
