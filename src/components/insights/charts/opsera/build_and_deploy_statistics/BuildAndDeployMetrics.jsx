import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import SonarRatingsChartHelpDocumentation
  from "components/common/help/documentation/insights/charts/SonarRatingsChartHelpDocumentation";
import SonarRatingsMaintainabilityDataBlock
  from "components/insights/charts/sonar/sonar_ratings/data_blocks/SonarRatingsMaintainabilityDataBlock";
import SonarRatingsVulnerabilityDataBlock
  from "components/insights/charts/sonar/sonar_ratings/data_blocks/SonarRatingsVulnerabilityDataBlock";
import ThreeStackedHorizontalMetricsContainer
  from "components/common/metrics/data_blocks/horizontal/ThreeStackedHorizontalMetricsContainer";
import SonarRatingsReliabilityDataBlock
  from "components/insights/charts/sonar/sonar_ratings/data_blocks/SonarRatingsReliabilityDataBlock";

function BuildAndDeployMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
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
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarRatings", kpiConfiguration, dashboardTags);
      const metrics = response?.data?.data[0]?.sonarRatings?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setSonarRatingsMetric(metrics[0]);
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
    if (sonarRatingsMetric == null) {
      return null;
    }

    return (
      <ThreeStackedHorizontalMetricsContainer
        topDataBlock={
          <SonarRatingsVulnerabilityDataBlock
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            securityRating={sonarRatingsMetric?.security_rating}
            vulnerabilityCount={sonarRatingsMetric?.vulnerabilities}
          />
        }
        middleDataBlock={
          <SonarRatingsReliabilityDataBlock
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            reliabilityRating={sonarRatingsMetric?.reliability_rating}
            bugCount={sonarRatingsMetric?.bugs}
          />
        }
        bottomDataBlock={
          <SonarRatingsMaintainabilityDataBlock
            dashboardData={dashboardData}
            kpiConfiguration={kpiConfiguration}
            maintainabilityRating={sonarRatingsMetric?.maintainability_rating}
            technicalDebtRatio={sonarRatingsMetric.technical_debt_ratio}
          />
        }
      />
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
        chartHelpComponent={(closeHelpPanel) => <SonarRatingsChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
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

BuildAndDeployMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default BuildAndDeployMetrics;
