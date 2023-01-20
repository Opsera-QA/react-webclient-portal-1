import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { Col, Row } from "react-bootstrap";
import ApprovalGatesDataBlockBase from "./data_blocks/ApprovalGatesDataBlockBase";
import ApprovalGatesExecutedActionableInsightOverlay from "./actionable_insights/ApprovalGatesExecutedActionableInsightOverlay";
import ApprovalGatesTotalPipelinesActionableInsightOverlay from "./actionable_insights/ApprovalGatesTotalPipelinesActionableInsightOverlay";
import approvalGatesChartsActions from "./metrics/ApprovalGatesMetric.action";

function ApprovalGatesMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const loadChartMetrics = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    let dashboardOrgs =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
        ?.value;
    const response = await approvalGatesChartsActions.approvalGates(
      getAccessToken,
      cancelSource,
      kpiConfiguration,
      dashboardTags,
      dashboardOrgs,
    );
    let dataObject = response?.data?.data?.data ? response?.data?.data?.data : [];

    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
    }
  };

  

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await loadChartMetrics(cancelSource);
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

  const rowClick = (type) =>{
    if(type==="total_approvals"){
      toastContext.showOverlayPanel(
        <ApprovalGatesExecutedActionableInsightOverlay
          title={type}
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          metrics={metrics}
        />
      );
    } else {
      toastContext.showOverlayPanel(
        <ApprovalGatesTotalPipelinesActionableInsightOverlay
          title={type}
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
        />
      );
    }
  };

  const getChartBody = () => {
    

    return (
      <div className="new-chart mb-1">
        <Row className="px-4">
          <Col xl={6} lg={4} sm={4} className={"my-1"}>
            <ApprovalGatesDataBlockBase score={metrics.total_pipelines_with_approval_gates} subtitle={'Total Pipelines with Approval Gate'} onClickFunction={()=>rowClick('total_pipelines')}  />
          </Col>
          <Col xl={6} lg={4} sm={4} className={"my-1"}>
            <ApprovalGatesDataBlockBase score={metrics.total_number_of_approvals_executed} subtitle={'Total Approvals Executed'} onClickFunction={()=>rowClick('total_approvals')} />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
      <ModalLogs
        header="Approval Gates Stats"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

ApprovalGatesMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ApprovalGatesMetrics;
