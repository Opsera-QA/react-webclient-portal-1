import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";
import {
  faArrowCircleDown,
  faArrowCircleUp,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import { getTimeDisplay } from "../../github_actions/github_actions-utility";

function IntermediateEnvironmentsLeadTimeChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [codeCommitToE1Metrics, setCodeCommitToE1Metrics] = useState([]);
  const [e1ToE2Metrics, setE1ToE2Metrics] = useState([]);
  const [e2ToE3Metrics, setE2ToE3Metrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    setKpiConfiguration({...kpiConfiguration, kpi_name:"All Environments - Lead Time"});


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
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let dashboardFilters =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "hierarchyFilters")]
            ?.value;
      const codeCommitToE1Response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsLeadTimeCodeCommitToE1",
        kpiConfiguration,
        dashboardTags,
        null,
        dashboardFilters,
        dashboardOrgs
      );
      const codeCommitToE1 = codeCommitToE1Response?.data?.data[0]?.leadTimeCodeCommitToE1?.data;

      const e1ToE2Response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsLeadTimeE1ToE2",
        kpiConfiguration,
        dashboardTags,
        null,
        dashboardFilters,
        dashboardOrgs
      );
      const e1ToE2 = e1ToE2Response?.data?.data[0]?.leadTimeE1ToE2?.data;

      const e2ToE3Response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsLeadTimeE2ToE3",
        kpiConfiguration,
        dashboardTags,
        null,
        dashboardFilters,
        dashboardOrgs
      );
      const e2ToE3 = e2ToE3Response?.data?.data[0]?.leadTimeE2ToE3?.data;

      if (isMounted?.current === true) {
        // setMetrics(dataObject);
        setCodeCommitToE1Metrics(codeCommitToE1?.[0]);
        setE1ToE2Metrics(e1ToE2?.[0]);
        setE2ToE3Metrics(e2ToE3?.[0]);
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
  const getIcon = (severity) => {
    switch (severity) {
      case "Up":
        return faArrowCircleUp;
      case "Down":
        return faArrowCircleDown;
      case "Neutral":
        return faMinusCircle;
      default:
        break;
    }
  };
  const getDescription = (severity) => {
    switch (severity) {
      case "Up":
        return "The lead time has increased from the previous time range";
      case "Down":
        return "The lead time has decreased from the previous time range";
      case "Neutral":
        return "The lead time has stayed the same from the previous time range";
    }
  };
  const getIconColor = (severity) => {
    switch (severity) {
      case "Up":
        return "red";
      case "Down":
        return "green";
      case "Neutral":
        return "light-gray-text-secondary";
      case "-":
        return "black";
      default:
        break;
    }
  };

  const getMiddleDataBlock = (title, score, last_score, trend) => {
    return (
      <DataBlockBoxContainer showBorder={true} className={'h-100'}>
      <ThreeLineScoreDataBlock
        className={`${getIconColor(trend)} p-2`}
        score={getTimeDisplay(score)}
        topText={title}
        bottomText={last_score ? "Previous Result: " + getTimeDisplay(last_score) : "No previous result"}
        icon={getIcon(trend)}
        iconOverlayBody={getDescription(trend)}
      />
      </DataBlockBoxContainer>
    );
  };
 

  const getChartBody = () => {
    // if (!Array.isArray(metrics) || metrics.length === 0) {
    //   return null;
    // }

    return (
      <div className="new-chart m-3 p-0 all-github-actions-data-block">
          <Row className="p-2 gray">
            <Col md={4}>{getMiddleDataBlock("Code Commit - E1", codeCommitToE1Metrics?.avgLeadTime, codeCommitToE1Metrics?.trendAvgLeadTime, codeCommitToE1Metrics?.trend)}</Col>
            <Col md={4}>{getMiddleDataBlock("E1 - E2", e1ToE2Metrics?.avgLeadTime, e1ToE2Metrics?.trendAvgLeadTime, e1ToE2Metrics?.trend)}</Col>
            <Col md={4}>{getMiddleDataBlock("E2 - E3", e2ToE3Metrics?.avgLeadTime, e2ToE3Metrics?.trendAvgLeadTime, e2ToE3Metrics?.trend)}</Col>
          </Row>
      </div>
    );
  };

  return (
    <div>
      <ChartContainer
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
        header="Intermediate Environments - Lead Time"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

IntermediateEnvironmentsLeadTimeChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default IntermediateEnvironmentsLeadTimeChart;
