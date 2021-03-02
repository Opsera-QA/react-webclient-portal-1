import React from "react";
import PropTypes from "prop-types";
import PipelineSuccessLogs from "../analytics/logs/pipelineSuccessLogs";
import PipelineFailureLogs from "../analytics/logs/pipelineFailureLogs";
import { Row, Col } from "react-bootstrap";

function LogsDashboard( { persona } ) {
  
  return (
    <>
      <div className="mt-3">
        <Row>
          <Col><PipelineSuccessLogs persona={persona}  /></Col>
          <Col><PipelineFailureLogs persona={persona}  /></Col>
        </Row>
        
      </div>
    </>
  );
}

LogsDashboard.propTypes = {
  persona: PropTypes.string
};

export default LogsDashboard;