import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/qa_metrics/automatedTestResultsPieChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig,
  getColorByData,
  getColor,
  assignStandardColors,
  shortenPieChartLegend,
  mainColor,
  getColorById
} from "../charts-views";
import ChartTooltip from "../ChartTooltip";
import { Col, Container, Row } from "react-bootstrap";
import DataBlockWrapper from "../../../common/data_boxes/DataBlockWrapper";

function AutomatedTestResultsPieChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "automatedTestResults", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.automatedTestResults?.data : [];
      assignStandardColors(dataObject[0]?.pairs);
      shortenPieChartLegend(dataObject[0]?.pairs);


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
    if (!Array.isArray(metrics[0]?.pairs) || metrics[0]?.pairs.length === 0) {
      return null;
    }

    return (

      <div className="new-chart mb-3" style={{height: "300px", display: "flex"}}>
        <Container>
          <Row className="p-1">
            <Col><div className="metric-box text-center">
              <div className="box-metric">
                <div>{metrics[0]?.totalTests}</div>
              </div>
              <div className="w-100 text-muted mb-1">Total Number of Tests Available</div>
            </div></Col>
          </Row>
          <Row className="p-1">
            <Col><div className="metric-box text-center">
              <div className="box-metric">
                <div>{metrics[0]?.totalExecuted}</div>
              </div>
              <div className="w-100 text-muted mb-1">Total Number of Tests executed</div>
            </div></Col>
          </Row>
          <Row className="p-1">
            <Col><div className="metric-box text-center">
              <div className="box-metric">
                <div className="green">{metrics[0]?.passRate+ "%"}</div>
              </div>
              <div className="w-100 text-muted mb-1">Pass Rate</div>
            </div></Col>
          </Row>
        </Container>
        <ResponsivePie
          data={metrics[0]?.pairs}
          {...defaultConfig()}
          {...config(getColorByData)}
          onClick={() => setShowModal(true)}
        />
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
        header="Unit Test Data Stats"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

AutomatedTestResultsPieChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func};

export default AutomatedTestResultsPieChart;