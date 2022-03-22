import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import SonarRatingsLeadershipChartHelpDocumentation
  from "../../../../common/help/documentation/insights/charts/SonarRatingsLeadershipChartHelpDocumentation";
import SonarRatingsLeadershipMaintainabilityDataBlockContainer from "components/insights/charts/sonar/sonar_leadership/data_blocks/SonarRatingsLeadershipMaintainabilityDataBlockContainer";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import BadgeBase from "components/common/badges/BadgeBase";
import { Col, Row } from "react-bootstrap";
import SonarRatingsLeadershipCodeCoverageDataBlockContainer from "components/insights/charts/sonar/sonar_leadership/data_blocks/SonarRatingsLeadershipCodeCoverageDataBlockContainer";
import SonarCoverageActionableTable from "./SonarCoverageActionableTable";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function SonarRatingLeadershipMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
        "sonarRatingsLeadership",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const metrics = response?.data?.data[0]?.sonarRatingsLeadership?.data;

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

    const getIcon = (severity) => {
      switch (severity) {
        case "Red":
          return faArrowCircleUp;
        case "Green":
          return faArrowCircleDown;
        case "Neutral":
          return faMinusCircle;
        default:
          break;
      }
    };

    const getReverseIcon = (severity) => {
      switch (severity) {
        case "Red":
          return faArrowCircleDown;
        case "Green":
          return faArrowCircleUp;
        case "Neutral":
          return faMinusCircle;
        default:
          break;
      }
    };

    const getIconColor = (severity) => {
      switch (severity) {
        case "Red":
          return "red";
        case "Green":
          return "green";
        case "Neutral":
          return "light-gray-text-secondary";
        case "-":
          return "black";
        default:
          break;
      }
    };

    const getIconTitle = (severity) => {
      switch (severity) {
        case "Red":
          return "Risk";
        case "Green":
          return "Success";
        case "Neutral":
          return "Same as Earlier";
        case "-":
          return "No Trend";
        default:
          break;
      }
    };

    const getDescription = (severity) => {
      switch (severity) {
        case "Red":
          return "This project's issues are trending upward";
        case "Green":
          return "This project's issues are trending downward";
        case "Neutral":
          return "Neutral: This project's issues have experienced no change";
      }
    };

    return (
      <>
        <div className={"mx-2"}>
          <Row className={"mx-0 p-2 justify-content-between"}>
            <Col className={"px-0 my-3"} xl={6} lg={12}>
              <SonarRatingsLeadershipMaintainabilityDataBlockContainer
                dashboardData={dashboardData}
                kpiConfiguration={kpiConfiguration}
                maintainabilityRating={sonarRatingsMetric?.technical_debt_ratio}
                technicalDebtRatio={sonarRatingsMetric?.technical_debt_ratio}
                icon={getIcon(sonarRatingsMetric?.debt_trend)}
                className={getIconColor(sonarRatingsMetric?.debt_trend)}
                lastScore={sonarRatingsMetric?.prev_technical_debt_ratio}
                iconOverlayBody={getDescription(sonarRatingsMetric?.debt_trend)}
              />
            </Col>
            <Col className={"px-0 my-3"} xl={6} lg={12}>
              <SonarRatingsLeadershipCodeCoverageDataBlockContainer
                dashboardData={dashboardData}
                kpiConfiguration={kpiConfiguration}
                tests={sonarRatingsMetric?.tests}
                lineCoverage={sonarRatingsMetric?.line_percentage}
                duplicate={sonarRatingsMetric?.duplication_percentage}
                icon={getReverseIcon(sonarRatingsMetric?.coverage_trend)}
                className={getIconColor(sonarRatingsMetric?.coverage_trend)}
                lastScore={sonarRatingsMetric?.prev_line_percentage}
                iconOverlayBody={getDescription(sonarRatingsMetric?.coverage_trend)}
              />
            </Col>
            <Col className={"px-0 my-3"} xl={12} lg={12}>
              <SonarCoverageActionableTable
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
              />
            </Col>
          </Row>
        </div>
        <BadgeBase className={"mx-2"} badgeText={"Please note, scan data used by these metrics is only available from Nov 25 2021 onward.  Any date selection prior to that will not return data."} />
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
        chartHelpComponent={(closeHelpPanel) => <SonarRatingsLeadershipChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
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

SonarRatingLeadershipMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SonarRatingLeadershipMetrics;
