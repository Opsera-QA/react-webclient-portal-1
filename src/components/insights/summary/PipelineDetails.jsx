import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Popover, OverlayTrigger } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function PipelineDetails() {
  const {getAccessToken} = useContext(AuthContext);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryPipelineDetails");
      let dataObject = response?.data ? response?.data?.data[0] : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getChartBody = () => {
    // if (!Array.isArray(metrics) || metrics.length === 0) {
    //   return null;
    // }

    // const infoPopover = (item) => {
    //   return (
    //     <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
    //       <Popover.Content>
    //         <div className="text-primary mb-2">{item._id}</div>
    //       </Popover.Content>
    //     </Popover>
    //   );
    // };
    return (
      <div className="new-chart mb-3" style={{height: "300px"}}>
        <Container>
          <Row className="p-3">
            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div>{metrics[0]?.totalPipelines[0]?.count[0]?.count}</div>
              </div>
              <div className="w-100 text-muted mb-1">Total Number of Pipelines Executed</div>
            </div></Col>

            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div className="green">{metrics[0]?.pipelinesPassedWithQualitySecurity[0]?.count[0]?.count}</div>
              </div>
              <div className="w-100 text-muted mb-1">Successful Pipelines (Security and Quality)</div>
            </div></Col>

            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div className="red">{metrics[0]?.pipelinesFailedSecurity[0]?.count[0]?.count}</div>
              </div>
              <div className="w-100 text-muted mb-1">Pipelines Failing Security Step</div>
            </div></Col>

            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div className="red">{metrics[0]?.pipelinesFailedQuality[0]?.count[0]?.count}</div>
              </div>
              <div className="w-100 text-muted mb-1">Pipelines Failing Quality Step</div>
            </div></Col>

            <Col><div className="metric-box p-3 text-center">
              <div className="box-metric">
                <div className="red">{metrics[0]?.pipelinesFailedDeployment[0]?.count[0]?.count}</div>
              </div>
              <div className="w-100 text-muted mb-1">Pipelines Failing Deployment Step</div>
            </div></Col>

          </Row>
        </Container>
      </div>

    );
  };

  return (
    getChartBody()
  );
}

PipelineDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default PipelineDetails;