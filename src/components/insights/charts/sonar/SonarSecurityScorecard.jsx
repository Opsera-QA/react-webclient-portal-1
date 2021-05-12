import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";

function SonarSecurityScorecard({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarSecurityQualityScorecard",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data ? response?.data?.data[0]?.sonarSecurityQualityScorecard?.data : [];
      console.log("dataObject", dataObject);

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <Container>
          <Row className="p-3">
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric">
                  <div
                    style={{ color: metrics[0]?.vulnerabilitiesScoreCard[0]?.ratingShade }}
                    //className={metrics[0]?.vulnerabilitiesScoreCard[0]?.ratingShade}
                  >
                    {metrics[0]?.vulnerabilitiesScoreCard[0]?.rating}
                  </div>
                </div>
                <div className="w-100 text-muted mb-1">Security</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric">
                  <div
                    style={{ color: metrics[1]?.reliabilityScoreCard[0]?.ratingShade }}
                    // className={metrics[1]?.reliabilityScoreCard[0]?.ratingShade}
                  >
                    {metrics[1]?.reliabilityScoreCard[0]?.rating}
                  </div>
                </div>
                <div className="w-100 text-muted mb-1">Reliability</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric">
                  <div
                    style={{ color: metrics[2]?.maintainabilityScoreCard[0]?.ratingShade }}
                    //className={metrics[2]?.maintainabilityScoreCard[0]?.ratingShade}
                  >
                    {metrics[2]?.maintainabilityScoreCard[0]?.rating}
                  </div>
                </div>
                <div className="w-100 text-muted mb-1">Maintainability</div>
              </div>
            </Col>
          </Row>
        </Container>
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
        header="Sonar Security Scorecard"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SonarSecurityScorecard.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SonarSecurityScorecard;
