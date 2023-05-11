import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {Col} from "react-bootstrap";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";

export default function TaskCardBody(
  {
    taskModel,
  }) {
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);
  console.log("status: " + JSON.stringify(taskModel?.getData("status")));

  if (taskModel == null) {
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
                {orchestrationHelper.getLastRunCardSummary(taskModel?.getData("completion"), taskModel?.getData("status"))}
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

TaskCardBody.propTypes = {
  taskModel: PropTypes.object,
};