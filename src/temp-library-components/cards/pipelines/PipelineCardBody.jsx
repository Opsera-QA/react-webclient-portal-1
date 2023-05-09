import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import {Col} from "react-bootstrap";
import DateHelper from "@opsera/persephone/helpers/date/date.helper";

const getLastRunDetails = (pipelineModel) => {
  const runCount = DataParsingHelper.parseInteger(pipelineModel?.getData("workflow.run_count"), 0);
  const lastRunCompletionDate = pipelineModel?.getData("workflow.last_run.completed");

  if (runCount === 0) {
    return (
      <div className={"d-flex"}>
        <div className={"text-muted m-auto"}>
          {/*{`This Pipeline has not been run yet`}*/}&nbsp;
        </div>
      </div>
    );
  }

  if (lastRunCompletionDate != null) {
    return (
      <div className={"d-flex text-muted"}>
        <div>
          Last run {DateHelper.formatDistanceToNow(lastRunCompletionDate, undefined, false, true)}
        </div>
      </div>
    );
  }

  return (
    <div className={"d-flex"}>
      <div className={"text-muted m-auto"}>
        {/*{`No metrics captured for last run`}*/}&nbsp;
      </div>
    </div>
  );
};

const getLastRunEntry = (pipelineModel) => {
  return (
    <Col xs={12}>
      <div className={"mt-2"}>
        <div className={"d-flex"}>
          <div className={"mx-auto"}>
            <span>&nbsp;</span>
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