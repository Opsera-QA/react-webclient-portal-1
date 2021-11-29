import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/qa_metrics/adoption_test_percentage/adoptionTestPercentagePieChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig, getColorByData,getColor, assignStandardColors,
  shortenPieChartLegend, mainColor,
} from "components/insights/charts/charts-views";
import { Col, Container, Row } from "react-bootstrap";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import NewPercentageDataBlock from "components/common/metrics/percentage/NewPercentageDataBlock";
import "components/insights/charts/qa_metrics/Styling.css";
import { METRIC_QUALITY_LEVELS } from "components/common/metrics/text/MetricTextBase";

// TODO: Remove after new version is validated
function AdoptionTestPercentageMetricV1({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notesData, setNotesData] = useState(undefined);
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
      let notes = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "notes")]?.value;
      setNotesData(notes);
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "adoptionPercentage", kpiConfiguration, dashboardTags);
      let dataObject = response?.data ? response?.data?.data[0]?.adoptionPercentage?.data : [];
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
          <Row className="p-0">
            <Col lg={6} md={8}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.executedTests}
                subtitle={"Automated Test Cases Executed"}
              />
            </Col>
            <Col lg={6} md={8}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.manualTests}
                subtitle={"Automated Test Cases Executed Manually"}
              />
            </Col>
          </Row>
          <Row className="p-0 justify-content-center">
            <Col lg={6} md={8} className="w-1000">
              <NewPercentageDataBlock
                className={"test-percentage"}
                percentage={metrics[0]?.adoptionRate}
                subtitle={"Adoption Percentage"}
                qualityLevel={metrics[0]?.adoptionRate < 98 ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS  }
                goal={"Goal: Adoption Percentage > 98%"}
              />
            </Col>
          </Row>
          <Row className="p-4">
            <Col className="text-center">
              <small> {notesData} </small>
            </Col>
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

AdoptionTestPercentageMetricV1.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default AdoptionTestPercentageMetricV1;