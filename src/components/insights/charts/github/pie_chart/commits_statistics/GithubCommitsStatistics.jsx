import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import config, { pieChartConfig } from "./githubCommitsStatisticsChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig,
  assignStandardColors,
  adjustBarWidth,
} from "../../../charts-views";
import {
  METRIC_THEME_CHART_PALETTE_COLORS,
  METRIC_CHART_STANDARD_HEIGHT,
} from "components/common/helpers/metrics/metricTheme.helpers";
import { Col, Row } from "react-bootstrap";
import GitHubCommitsTotalCommitsDataBlock from "./data_blocks/GitHubCommitsTotalCommitsDataBlock";
import GitHubCommitsTotalMergesDataBlock from "./data_blocks/GitHubCommitsTotalMergesDataBlock";
import GitHubCommitsTotalPullRequestsDataBlock from "./data_blocks/GitHubCommitsTotalPullRequestsDataBlock";
import { DialogToastContext } from "contexts/DialogToastContext";
import GithubCommitsActionableInsightOverlay from "./actionable_insights/GithubCommitsActionableInsightOverlay";
import GithubDeclinedPullRequestActionableInsightOverlay from "./actionable_insights/GithubDeclinedPullRequestActionableInsightOverlay";
import GithubApprovedPullRequestActionableInsightOverlay from "./actionable_insights/GithubApprovedPullRequestActionableInsightOverlay";
import {Container} from "@nivo/core";
import GitHubCommitsTotalActivityDataBlock from "./data_blocks/GithubCommitsTotalActivityDataBlock";
import GitHubCommitsOpenPullRequestDataBlock from "./data_blocks/GithubCommitsOpenPullRequestDataBlock";
import GitHubCommitsTotalDeclinedDataBlock from "./data_blocks/GitHubCommitsTotalDeclinedDataBlock";
import GithubCommitsTotalFixedDataBlock from "./data_blocks/GithubCommitsTotalFixedDataBlock";
import GithubCommitStatisticsHelpDocumentation
  from "../../../../../common/help/documentation/insights/charts/GithubCommitStatisticsHelpDocumentation";
// import GithubCommitStatisticsHelpDocumentation from "components/common/help/documentation/insights/charts/github/GithubCommitStatisticsHelpDocumentation";

function GithubCommitsStatistics({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [mostActiveUsersMetrics, setMostActiveUsersMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [totalPullRequest, setTotalPullRequest] = useState(0);
  const [totalCommits, setTotalCommits] = useState(0);
  const [totalMerges, setTotalMerges] = useState(0);
  const [totalOpen, setTotalOpen] = useState(0);
  const [totalActivity, setTotalActivity] = useState(0);
  const [totalFixed, setTotalFixed] = useState(0);
  const [highestMergesMetric, setHighestMergesMetric] = useState([]);
  const [totalDeclinedMerges, setTotalDeclinedMerges] = useState(0);
  const [totalDeclinedActionable, setTotalDeclinedActionable] = useState([]);
  const [repositoriesWithCommits, setRepositoriesWithCommits] = useState([]);
  const toastContext = useContext(DialogToastContext);

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
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      let dashboardFilters =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "hierarchyFilters",
          )
        ]?.value;
      const response = await chartsActions.getGithubTotalCommitsMetrics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardFilters,
        dashboardOrgs,
      );
      let dataObject = response?.data
        ? response?.data?.data?.most_active_users
        : [];
      dataObject.sort((a, b) => {
        if (a.commitCount < b.commitCount) {
          return -1;
        }
        if (a.commitCount > b.commitCount) {
          return 1;
        }
        return 0;
      });
      const total_pull_request = response?.data
        ? response?.data?.data?.total_pull_request
        : 0;
      const total_activity = response?.data
          ? response?.data?.data?.total_activity
          : 0;
      const open_pull_request = response?.data
          ? response?.data?.data?.open_pull_request
          : 0;
      const fixed_pull_request = response?.data
          ? response?.data?.data?.fixed_pull_request
          : 0;
      const total_commits = response?.data
        ? response?.data?.data?.total_commits
        : 0;
      const total_merges = response?.data
        ? response?.data?.data?.total_merges
        : 0;
      const project_with_highest_merges = response?.data
        ? response?.data?.data?.project_with_highest_merges
        : [];
      const total_declined_merges = response?.data
        ? response?.data?.data?.total_declined_merges
        : 0;
      const declined_actionable = response?.data
          ? response?.data?.data?.declined_actionable
          : [];
      const repositories_with_commits = response?.data
        ? response?.data?.data?.repositories_with_commits
        : [];
      assignStandardColors(dataObject, true);

      if (isMounted?.current === true && dataObject) {
        setMostActiveUsersMetrics(dataObject);
        setTotalPullRequest(total_pull_request);
        setTotalCommits(total_commits);
        setTotalMerges(total_merges);
        setTotalOpen(open_pull_request),
        setTotalActivity(total_activity),
        setTotalFixed(fixed_pull_request),
        setHighestMergesMetric(project_with_highest_merges);
        setTotalDeclinedMerges(total_declined_merges);
        setTotalDeclinedActionable(declined_actionable);
        setRepositoriesWithCommits(repositories_with_commits);
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

  const onRowSelect = () => {
      toastContext.showOverlayPanel(
          <GithubCommitsActionableInsightOverlay
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              highestMergesMetric={highestMergesMetric}
              totalDeclinedMerges={totalDeclinedActionable}
              repositoriesWithCommits={repositoriesWithCommits}
          />,
      );
  };

  const showGithubApprovedPullRequestModal = (node) => {
    toastContext.showOverlayPanel(
      <GithubApprovedPullRequestActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        highestMergesMetric={highestMergesMetric}
        repository={node?.id}
      />,
    );
  };

  const showGithubDeclinedPullRequestModal = (node) => {
    toastContext.showOverlayPanel(
      <GithubDeclinedPullRequestActionableInsightOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        highestMergesMetric={highestMergesMetric}
        repository={node?.id}
      />,
    );
  };

  const getChartBody = () => {
    if (
        !Array.isArray(mostActiveUsersMetrics) ||
        mostActiveUsersMetrics.length === 0
    ) {
      return null;
    }

    return (
        <div
            className="new-chart mb-3"
            style={{ minHeight: "300px" }}
        >
          <Container>
            <Row className="p-2 gray justify-content-center">
              <Col
                  md={3}
              >
                <GitHubCommitsTotalActivityDataBlock data={totalActivity} />
              </Col>
              <Col
                  md={3}
              >
                <GitHubCommitsTotalPullRequestsDataBlock data={totalPullRequest} />
              </Col>
              <Col
                  md={3}
              >
                <GitHubCommitsOpenPullRequestDataBlock data={totalOpen} />
              </Col>
              <Col
                  md={3}
              >
                <GitHubCommitsTotalMergesDataBlock data={totalMerges} />
              </Col>
            </Row>
            <Row className="p-2 gray justify-content-center">
              <Col
                  md={3}
              >
                <GitHubCommitsTotalCommitsDataBlock data={totalCommits} />
              </Col>
              <Col
                  md={3}
              >
                <GitHubCommitsTotalDeclinedDataBlock data={totalDeclinedMerges} />
              </Col>
              <Col
                  md={3}
              >
                <GithubCommitsTotalFixedDataBlock data={totalFixed} />
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
            launchActionableInsightsFunction={onRowSelect}
            chartHelpComponent={(closeHelpPanel) => (
                <GithubCommitStatisticsHelpDocumentation
                    closeHelpPanel={closeHelpPanel}
                />
            )}
        />
        <ModalLogs
            header="Github Commits Statistics"
            size="lg"
            jsonMessage={mostActiveUsersMetrics}
            dataType="bar"
            show={showModal}
            setParentVisibility={setShowModal}
        />
      </div>
  );
}
GithubCommitsStatistics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};
export default GithubCommitsStatistics;
