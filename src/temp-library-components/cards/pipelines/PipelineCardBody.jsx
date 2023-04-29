import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import {Col} from "react-bootstrap";

const getLastRunDetails = (pipelineModel) => {
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const lastRunCompletionDate = pipelineModel?.getData("workflow.last_run.completed");

  if (runCount === 0) {
    return (
      <div className={"d-flex"}>
        <div className={"text-muted m-auto"}>
          {`This Pipeline has not been run yet`}
        </div>
      </div>
    );
  }

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex text-muted"}>
        <div className={"mx-auto"}>
          {DateFormatHelper.formatDateAsTimestampWithoutSeconds(lastRunCompletionDate)}
        </div>
      </div>
    );
  }

  return (
    <div className={"d-flex"}>
      <div className={"text-muted m-auto"}>
        {`No metrics captured for last run`}
      </div>
    </div>
  );
};

const getLastRunEntry = (pipelineModel) => {
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const lastRunColor =
    runCount > 0
      ? ""
      : "white";

  return (
    <Col xs={12}>
      <div className={"mt-2"}>
        <div className={"d-flex"}>
          <div className={"mx-auto"}>
            <span style={{color: lastRunColor}}>Last Run</span>
          </div>
        </div>
        {getLastRunDetails(pipelineModel)}
      </div>
    </Col>
  );
};

export default function PipelineCardBody(
  {
    pipelineModel,
  }) {
  const formattedLastRun = getLastRunEntry(pipelineModel);

  if (pipelineModel == null) {
    return undefined;
  }

  return (
    <div className={"mb-1"}>
      <Row className={"small"}>
        {formattedLastRun}
      </Row>
    </div>
  );
}

PipelineCardBody.propTypes = {
  pipelineModel: PropTypes.object,
};