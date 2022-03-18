import React, {useState, useEffect, useContext, useRef} from "react";
import MetricContentDataBlockBase from "../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import TwoLineScoreDataBlock from "../../../../common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import TwoLinePercentageDataBlock from "../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {getAmexApplicationFromKpiConfiguration} from "components/insights/charts/charts-helpers";
import SalesforceProfileMigrationDurationMetrics from "../../sfdc/bar_chart/duration_by_stage/metrics/profile_migration/SalesforceProfileMigrationDurationMetric";

function AllGithubActionsDataBlock({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
  const [applicationMetrics, setApplicationMetrics] = useState([]);
  const [reasonsMetrics, setReasonsMetrics] = useState([]);
  const [durationMetrics, setDurationMetrics] = useState([]);
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
      // await loadDataPoints(cancelSource);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTraceability",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const metrics = response?.data?.data[0]?.traceability?.data;

      const applicationResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTopApplicationsSuccessAndFailurePercentage",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const applicationMetrics = applicationResponse?.data?.data;

      const reasonsResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsCommonReasonsForFailure",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const reasonsMetrics = reasonsResponse?.data?.data[0]?.commonReasonsForFailure?.data;

      const durationResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTopApplicationsDuration",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );

      const durationMetrics = durationResponse?.data?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setMetrics(metrics[0]);
        setApplicationMetrics(applicationMetrics[0]);
        setReasonsMetrics(reasonsMetrics);
        setDurationMetrics(durationMetrics[0]);
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
  console.log(durationMetrics);
  console.log(applicationMetrics);
  console.log(metrics);
  console.log(reasonsMetrics);
  const getChartBody = () => {
    return (
      <>
        <div className="new-chart m-3 p-0 all-github-actions-data-block" style={{ minHeight: "300px"}}>
          <Row>
            <Col md={4}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <TwoLinePercentageDataBlock dataPoint={dataPointHelpers.getDataPoint(
                        kpiConfiguration?.dataPoints,
                        "all-github-actions-success-data-point"
                    )} percentage={metrics.successPercentage} subtitle={"Goal: 95%"} />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
            <Col md={4}>
              <DataBlockBoxContainer showBorder={true}>
                <TwoLineScoreDataBlock
                  className="p-3"
                  score={metrics.successCount}
                  subtitle={"Total Successful Executions"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={4}>
              <DataBlockBoxContainer showBorder={true}>
                <TwoLineScoreDataBlock
                  className="p-3"
                  score={metrics.failureCount}
                  subtitle={"Total Failed Executions"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top applications with higher success rate"}
                  content={applicationMetrics.slice(0, 5).map(obj => {
                    return <div key={obj._id}>{obj.applicationName}</div>;
                  })}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top applications with higher failure rate"}
                  content={applicationMetrics.slice(-5).reverse().map(obj => {
                    return <div key={obj._id}>{obj.applicationName}</div>;
                  })}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top applications with longer duration"}
                  content={durationMetrics ? durationMetrics.slice(0, 5).map(obj => {
                    return <div key={obj}>{obj.applicationName}</div>;
                  }) : []}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Most common reasons of failure"}
                  content={reasonsMetrics.slice(0, 5).map(obj => {
                    return <div key={obj._id}>{obj._id}</div>;
                  })}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
      />
      <ModalLogs
        header="Github Actions Statistics"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

AllGithubActionsDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default AllGithubActionsDataBlock;