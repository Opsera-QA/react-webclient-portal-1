import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {Col} from "react-bootstrap";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineCardBody(
  {
    pipelineModel,
  }) {
  const orchestrationState = pipelineHelper.getPipelineModelOrchestrationState(pipelineModel);
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);

  if (pipelineModel == null || orchestrationState == null) {
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
            <div className={"mt-auto w-100 d-flex justify-content-between"}>
              <div>
                {orchestrationHelper.getLastRunCardSummary(pipelineHelper.getLastRunCompletionTime(pipelineModel?.getOriginalData()), pipelineHelper.getPipelineModelOrchestrationState(pipelineModel), "Pipeline")}
              </div>
              <div>
                <span>{runCount} Runs</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

PipelineCardBody.propTypes = {
  pipelineModel: PropTypes.object,
};