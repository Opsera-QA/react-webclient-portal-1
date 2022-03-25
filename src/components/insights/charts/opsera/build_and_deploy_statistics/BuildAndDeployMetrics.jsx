import React, {useState, useContext, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import SonarRatingsChartHelpDocumentation
  from "components/common/help/documentation/insights/charts/SonarRatingsV2ChartHelpDocumentation";
import DeploymentStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/DeploymentStatisticsDataBlockContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import BuildStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_statistics/BuildStatisticsDataBlockContainer";
import DeploymentFrequencyStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_frequency_statistics/DeploymentFrequencyStatisticsDataBlockContainer";
import BuildFrequencyStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_frequency_statistics/BuildFrequencyStatisticsDataBlockContainer";
import AllDeploymentStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/deployment_statistics/AllDeploymentStatisticsDataBlockContainer";
import AllBuildStatisticsDataBlockContainer
  from "components/insights/charts/opsera/build_and_deploy_statistics/build_statistics/AllBuildStatisticsDataBlockContainer";

function BuildAndDeployMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [sonarRatingsMetric, setSonarRatingsMetric] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  // TODO: Wire up data pull and pass relevant data down
  // useEffect(() => {
  //   if (cancelTokenSource) {
  //     cancelTokenSource.cancel();
  //   }
  //
  //   const source = axios.CancelToken.source();
  //   setCancelTokenSource(source);
  //
  //   isMounted.current = true;
  //   loadData(source).catch((error) => {
  //     if (isMounted?.current === true) {
  //       throw error;
  //     }
  //   });
  //
  //   return () => {
  //     source.cancel();
  //     isMounted.current = false;
  //   };
  // }, [JSON.stringify(dashboardData)]);
  //
  // // TODO: Don't send this complicated object, just send the metric
  // const loadData = async (cancelSource = cancelTokenSource) => {
  //   try {
  //     setIsLoading(true);
  //     let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
  //     const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "sonarRatings", kpiConfiguration, dashboardTags);
  //     const metrics = response?.data?.data[0]?.sonarRatings?.data;
  //
  //     if (isMounted?.current === true && Array.isArray(metrics)) {
  //       setSonarRatingsMetric(metrics[0]);
  //     }
  //   }
  //   catch (error) {
  //     if (isMounted?.current === true) {
  //       console.error(error);
  //       setError(error);
  //     }
  //   }
  //   finally {
  //     if (isMounted?.current === true) {
  //       setIsLoading(false);
  //     }
  //   }
  // };
  //

  const getChartBody = () => {
    return (
      <Row className={"mx-0 p-2 justify-content-between"}>
        <Col className={"px-0"} xl={7} lg={12}>
          <DeploymentStatisticsDataBlockContainer />
        </Col>
        <Col className={"px-0"} xl={5} md={12}>
          <DeploymentFrequencyStatisticsDataBlockContainer />
        </Col>
        <Col className={"px-0"} xl={7} lg={12}>
          <BuildStatisticsDataBlockContainer />
        </Col>
        <Col className={"px-0"} xl={5} lg={12}>
          <BuildFrequencyStatisticsDataBlockContainer />
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Build and deploy metrics"}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        // loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => <SonarRatingsChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
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
