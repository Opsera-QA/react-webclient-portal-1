import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import {
  getDeploymentStageFromKpiConfiguration, getResultFromKpiConfiguration, getUseDashboardTagsFromKpiConfiguration, MATURITY_SCORE_TEXT
} from "../../charts-helpers";
import InfoDialog from "../../../../common/status_notifications/info";
import doraAction from "../dora.action";
import DoraJiraGitlabRolledUpColumnDataBlock from "./DoraJiraGitlabRolledUpColumnDataBlock";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import DoraJiraOrgsActionableOverlay from "./actionable_insights/DoraJiraOrgsActionableOverlay";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";

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
      const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
      if(selectedDeploymentStages && jiraResolutionNames?.length && useDashboardTags && dashboardOrgs?.length) {
        const response = await doraAction.jiraGitlabRolledUp(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        );

        const metrics = response?.data?.data;

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

  const toastContext = useContext(DialogToastContext);

  const onRowSelect = (stat) => {
    toastContext.showOverlayPanel(
        <DoraJiraOrgsActionableOverlay
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            data={metricData?.filter(item=> item.overallMaturityScoreText == stat)}
        />
    );
  };


  const getChartBody = () => {
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
    const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
    const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
    let dashboardOrgs =
        dashboardData?.data?.filters[
            dashboardData?.data?.filters.findIndex(
                (obj) => obj.type === "organizations",
            )
            ]?.value;
    if (!selectedDeploymentStages || !jiraResolutionNames?.length || !useDashboardTags || !dashboardOrgs?.length) {
      return (
          <div className="new-chart mb-3" style={{ height: "300px" }}>
            <div className="max-content-width p-5 mt-5"
                 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InfoDialog message="Missing Required Filters. Dashboard Organization tags,Deployment Stages and Jira Resolution Names are Mandatory" />
            </div>
          </div>
      );
    }

    if (metricData && !metricData.length) {
      return null;
    }

    // add color to each org tag (cycling through 5 NIVO theme colors and sorted by category, then alphabetrically)
    const coloredMetricData = [...metricData]
    .sort((
      { name: nameA, overallMaturityScoreText: scoreA },
      { name: nameB, overallMaturityScoreText: scoreB }
    ) => {
      if (scoreA === scoreB) {
        // equal score, sort alphabetically, ascending
        if (nameA === nameB) {
          return 0;
        }
        return nameA < nameB ? -1 : 1;
      }

      switch (scoreA) {
        case MATURITY_SCORE_TEXT.ELITE:
          return -1;
        case MATURITY_SCORE_TEXT.HIGH:
          if (scoreB === MATURITY_SCORE_TEXT.ELITE) {
            return 1;
          }
          return -1;
        case MATURITY_SCORE_TEXT.MEDIUM:
          if (scoreB === MATURITY_SCORE_TEXT.LOW) {
            return -1;
          }
          return 1;
        case MATURITY_SCORE_TEXT.LOW:
          return 1;
        default:
          return 0;
      }
    }).map((data, index) => ({
      ...data,
      color: METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY[index % 5]
    }));

    return (
        <div
            className="m-3"
            style={{ minHeight: "450px" }}
        >
          <Row
              className={`w-100`}
          >
            <Col md={12} className={"mb-2"}>
              <DoraJiraGitlabRolledUpColumnDataBlock
                  onSelect={() => onRowSelect("elite")}
                  maturityScoreText={'elite'}
                  overlayData={coloredMetricData}
              />
            </Col>
            <Col md={12} className={"mb-2"}>
              <DoraJiraGitlabRolledUpColumnDataBlock
                  onSelect={() => onRowSelect("high")}
                  maturityScoreText={'high'}
                  overlayData={coloredMetricData}
              />
            </Col>
            <Col md={12} className={"mb-2"}>
              <DoraJiraGitlabRolledUpColumnDataBlock
                  onSelect={() => onRowSelect("medium")}
                  maturityScoreText={'medium'}
                  overlayData={coloredMetricData}
              />
            </Col>
            <Col md={12}>
              <DoraJiraGitlabRolledUpColumnDataBlock
                  onSelect={() => onRowSelect("low")}
                  maturityScoreText={'low'}
                  overlayData={coloredMetricData}
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