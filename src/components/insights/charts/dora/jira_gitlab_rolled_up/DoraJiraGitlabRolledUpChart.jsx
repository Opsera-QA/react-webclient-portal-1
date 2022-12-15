import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import {
  getDeploymentStageFromKpiConfiguration, getResultFromKpiConfiguration,
} from "../../charts-helpers";

import GitlabLeadTimeHelpDocumentation
  from "../../../../common/help/documentation/insights/charts/GitlabLeadTimeHelpDocumentation";
import InfoDialog from "../../../../common/status_notifications/info";
import doraAction from "../dora.action";
import DoraJiraGitlabRolledUpColumnDataBlock from "./DoraJiraGitlabRolledUpColumnDataBlock";


function DoraJiraGitlabRolledUpChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      const selectedDeploymentStages =
        getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
      const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
      if(selectedDeploymentStages && jiraResolutionNames?.length) {
        const response = await doraAction.jiraGitlabRolledUp(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        );

        const metrics = response?.data?.data;
        console.log(metrics);

        if (
          isMounted?.current === true && metrics?.length
        ) {
          setMetricData(metrics);
        } else {
          setMetricData([]);
        }
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
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
    const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
    if (!selectedDeploymentStages && !jiraResolutionNames?.length) {
      return (
          <div className="new-chart mb-3" style={{ height: "300px" }}>
            <div className="max-content-width p-5 mt-5"
                 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InfoDialog message="Missing Required Filters. Deployment Stages and Jira Resolution Names are Mandatory" />
            </div>
          </div>
      );
    }

    if (metricData && !metricData.length) {
      return null;
    }

    return (
      <div
        className="m-3"
        style={{ minHeight: "450px", display: "flex" }}
      >
        <Row
            xl={4}
            lg={4}
            md={4}
            className={`mb-2 w-100 py-2 d-flex justify-content-center maturity-border`}
        >
          <Col md={12} className={"pl-2 pr-1"}>
        <DoraJiraGitlabRolledUpColumnDataBlock
          maturityScoreText = {'elite'}
          overlayData={metricData?.filter(item=> item.overallMaturityScoreText == 'elite')}
        />
          </Col>
          <Col md={12} className={"px-1"}>
          <DoraJiraGitlabRolledUpColumnDataBlock
            maturityScoreText = {'high'}
            overlayData={metricData?.filter(item=> item.overallMaturityScoreText == 'high')}
        />
          </Col>
          <Col md={12} className={"px-1"}>
          <DoraJiraGitlabRolledUpColumnDataBlock
              maturityScoreText = {'medium'}
              overlayData={metricData?.filter(item=> item.overallMaturityScoreText == 'medium')}
        />
          </Col>
          <Col md={12} className={"pl-1 pr-2"}>
        <DoraJiraGitlabRolledUpColumnDataBlock
            maturityScoreText = {'low'}
            overlayData={metricData?.filter(item=> item.overallMaturityScoreText == 'low')}
        />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Dora Rolled up Chart"}
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
    </div>
  );
}

DoraJiraGitlabRolledUpChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default DoraJiraGitlabRolledUpChart;
