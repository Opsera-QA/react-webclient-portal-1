import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import { Col, Row } from "react-bootstrap";
import ApprovalGatesDataBlockBase from "../../data_blocks/ApprovalGatesDataBlockBase";

const APPROVAL_GATES = "approval_gates";

function ApprovalGatesExecutedDataBlocks({ dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
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
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const loadBlockMetrics = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    let dashboardOrgs =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
        ?.value;
    const response = {
        tool: "opsera",
        data: {
          total_pipelines_approved: 20,
          total_pipelines_rejected: 100,
          average_approval_time: "20secs"
        },
        status: 200,
        status_text: "OK"
      };
    let dataObject = response?.data ? response?.data : [];

    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
    }
  };

  

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await loadBlockMetrics(cancelSource);
      // await loadDataPoints(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };


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
};

export default ApprovalGatesExecutedDataBlocks;
