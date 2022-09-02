import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import ApprovalGatesDataBlockBase from "../../data_blocks/ApprovalGatesDataBlockBase";
import { dateHelpers } from "components/common/helpers/date/date.helpers";


function ApprovalGatesExecutedDataBlocks({ metrics }) {
  var seconds = ((metrics.average_approval_time % 60000) / 1000).toFixed(0);
  return (
    <div className="new-chart mb-1">
        <Row className="px-4">
          <Col xl={4} lg={4} sm={4} className={"my-1"}>
            <ApprovalGatesDataBlockBase score={metrics.total_pipelines_approved} subtitle={'Total Pipelines Approved'} />
          </Col>
          <Col xl={4} lg={4} sm={4} className={"my-1"}>
            <ApprovalGatesDataBlockBase score={metrics.total_pipelines_rejected} subtitle={'Total Approvals Rejected'} />
          </Col>
          <Col xl={4} lg={4} sm={4} className={"my-1"}>
            <ApprovalGatesDataBlockBase score={`${seconds} Seconds`} subtitle={'Average Approval Time'} />
          </Col>
        </Row>
      </div>
  );
}

ApprovalGatesExecutedDataBlocks.propTypes = {
  metrics: PropTypes.object
};

export default ApprovalGatesExecutedDataBlocks;
