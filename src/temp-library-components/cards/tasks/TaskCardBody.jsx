import PropTypes from "prop-types";
import React from "react";
import Row from "react-bootstrap/Row";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import {Col} from "react-bootstrap";

const getLastRunDetails = (taskModel) => {
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);
  const lastRunCompletionDate = taskModel?.getData("completion");

  if (runCount === 0) {
    return (
      <div className={"d-flex"}>
        <div className={"text-muted m-auto"}>
          {`This Task has not been run yet`}
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

const getLastRunEntry = (taskModel) => {
  const runCount = DataParsingHelper.parseInteger(taskModel?.getData("run_count"), 0);
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
        {getLastRunDetails(taskModel)}
      </div>
    </Col>
  );
};

export default function TaskCardBody(
  {
    taskModel,
  }) {
  const formattedLastRun = getLastRunEntry(taskModel);

  if (taskModel == null) {
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

TaskCardBody.propTypes = {
  taskModel: PropTypes.object,
};