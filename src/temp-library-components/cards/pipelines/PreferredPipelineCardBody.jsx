import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PreferredPipelineCardBody(
  {
    pipelineModel,
  }) {
  if (pipelineModel == null) {
    return undefined;
  }

  return (
    <div className={"mb-1"}>
      <Row className={"small"}>
        <Col xs={12}>
          <div
            className={"w-100 d-flex mt-2"}
            style={{
              minHeight: "39px",
              maxHeight: "39px",
            }}
          >
            <div className={"mt-auto mx-auto"}>
              {orchestrationHelper.getLastRunCardSummary(pipelineHelper.getLastRunCompletionTime(pipelineModel?.getOriginalData()), pipelineHelper.getPipelineModelOrchestrationState(pipelineModel), "Pipeline")}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

PreferredPipelineCardBody.propTypes = {
  pipelineModel: PropTypes.object,
};