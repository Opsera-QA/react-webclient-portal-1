import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import SonarRatingsChartHelpDocumentation from "components/common/help/documentation/insights/charts/SonarRatingsChartHelpDocumentation";
import SonarRatingsMaintainabilityDataBlockContainer from "components/insights/charts/sonar/sonar_ratings/data_blocks/SonarRatingsMaintainabilityDataBlockContainer";
import SonarRatingsVulnerabilityDataBlockContainer from "components/insights/charts/sonar/sonar_ratings/data_blocks/SonarRatingsVulnerabilityDataBlockContainer";
import ThreeStackedHorizontalMetricsContainer from "components/common/metrics/data_blocks/horizontal/ThreeStackedHorizontalMetricsContainer";
import SonarRatingsReliabilityDataBlockContainer from "components/insights/charts/sonar/sonar_ratings/data_blocks/SonarRatingsReliabilityDataBlockContainer";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import BadgeBase from "components/common/badges/BadgeBase";
import { Col, Row } from "react-bootstrap";
import SonarRatingsCodeCoverageBlockContainer from "./data_blocks/SonarRatingsCodeCoverageBlockConatainer";

function SonarRatingMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [sonarRatingsMetric, setSonarRatingsMetric] = useState(undefined);
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

  // TODO: Don't send this complicated object, just send the metric
  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarRatingsV2",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const metrics = response?.data?.data[0]?.sonarRatings?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setSonarRatingsMetric(metrics[0]);
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
    if (sonarRatingsMetric == null) {
      return null;
    }

    return (
      <>
        <div className={"mx-2"}>
          <Row className={"mx-0 p-2 justify-content-between"}>
            <Col className={"px-0 my-3"} xl={6} lg={12}>
              <SonarRatingsVulnerabilityDataBlockContainer
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
                securityRating={sonarRatingsMetric?.security_rating}
                vulnerabilityCount={sonarRatingsMetric?.vulnerabilities}
              />
            </Col>
            <Col className={"px-0 my-3"} xl={6} lg={12}>
              <SonarRatingsMaintainabilityDataBlockContainer
                dashboardData={dashboardData}
                kpiConfiguration={kpiConfiguration}
                maintainabilityRating={sonarRatingsMetric?.maintainability_rating}
                technicalDebtRatio={sonarRatingsMetric.technical_debt_ratio}
              />
            </Col>
            <Col className={"px-0 my-3"} xl={6} lg={12}>
              <SonarRatingsReliabilityDataBlockContainer
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
                reliabilityRating={sonarRatingsMetric?.reliability_rating}
                bugCount={sonarRatingsMetric?.bugs}
              />
            </Col>
            <Col className={"px-0 my-3"} xl={6} lg={12}>
              <SonarRatingsCodeCoverageBlockContainer
                dashboardData={dashboardData}
                kpiConfiguration={kpiConfiguration}
                tests={sonarRatingsMetric?.tests}
                lineCoverage={sonarRatingsMetric?.line_percentage}
                duplicate={sonarRatingsMetric?.duplication_percentage}
              />
            </Col>
          </Row>
        </div>
        <BadgeBase
          className={"mx-2"}
          badgeText={
            "Please note, scan data used by these metrics is only available from Nov 25 2021 onward.  Any date selection prior to that will not return data."
          }
        />
      </>
    );
  };

  return (
    <div>
      <VanityMetricContainer
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
        chartHelpComponent={(closeHelpPanel) => <SonarRatingsChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
        showSettingsToggle={showSettingsToggle}
      />
      <ModalLogs
        header="Build Duration"
        size="lg"
        jsonMessage={sonarRatingsMetric}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SonarRatingMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SonarRatingMetrics;
