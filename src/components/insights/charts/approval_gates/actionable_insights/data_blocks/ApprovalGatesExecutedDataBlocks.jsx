import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { Col, Row } from "react-bootstrap";
import ApprovalGatesDataBlockBase from "../../data_blocks/ApprovalGatesDataBlockBase";

const APPROVAL_GATES = "approval_gates";

function ApprovalGatesExecutedDataBlocks({ dashboardData , metrics}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);


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
            <ApprovalGatesDataBlockBase score={metrics.average_approval_time} subtitle={'Average approval time'} />
          </Col>
        </Row>
      </div>
  );
}

ApprovalGatesExecutedDataBlocks.propTypes = {
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  metrics: PropTypes.object
};

export default ApprovalGatesExecutedDataBlocks;
