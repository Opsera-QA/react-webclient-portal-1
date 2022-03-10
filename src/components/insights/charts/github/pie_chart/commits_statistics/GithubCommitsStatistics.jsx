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
  getColorByData,
  assignStandardColors,
  adjustBarWidth,
  spaceOutMergeRequestTimeTakenLegend,
} from "../../../charts-views";
import {
  METRIC_THEME_CHART_PALETTE_COLORS,
  METRIC_CHART_STANDARD_HEIGHT,
} from "components/common/helpers/metrics/metricTheme.helpers";
import { Col, Row } from "react-bootstrap";
import GitHubCommitsTotalCommitsDataBlock from "./data_blocks/GitHubCommitsTotalCommitsDataBlock";
import GitHubCommitsTotalMergesDataBlock from "./data_blocks/GitHubCommitsTotalMergesDataBlock";
import GitHubCommitsTotalPullRequestsDataBlock from "./data_blocks/GitHubCommitsTotalPullRequestsDataBlock";

function GithubCommitsStatistics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
  const [highestMergesMetric, setHighestMergesMetric] = useState([]);
  const [totalDeclinedMerges, setTotalDeclinedMerges] = useState([]);
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
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = {
        data: {
          total_pull_request: 12,
          total_commits: 53,
          most_active_users: [
            {
              _id: "Noah Champoux",
              count: 331,
            },
            {
              _id: "Syed Faseehuddin",
              count: 159,
            },
            {
              _id: "Vasanthavishnu Vasudevan",
              count: 150,
            },
            {
              _id: "Christina",
              count: 134,
            },
            {
              _id: "Harsha Pullabhatlapogada",
              count: 115,
            },
          ],
          project_with_highest_merges: [
            {
              id: "java",
              label: "java",
              value: 152,
            },
            {
              id: "lisp",
              label: "lisp",
              value: 139,
            },
            {
              id: "make",
              label: "make",
              value: 147,
            },
            {
              id: "sass",
              label: "sass",
              value: 198,
            },
          ],
          total_declined_merges: [
            {
              id: "java",
              label: "java",
              value: 152,
            },
            {
              id: "lisp",
              label: "lisp",
              value: 139,
            },
          ],
          total_merges: 34,
        },
      };
      let dataObject = response.data.most_active_users;
      assignStandardColors(dataObject, true);
      spaceOutMergeRequestTimeTakenLegend(dataObject);

      if (isMounted?.current === true && dataObject) {
        setMostActiveUsersMetrics(dataObject);
        setTotalPullRequest(response.data.total_pull_request);
        setTotalCommits(response.data.total_commits);
        setTotalMerges(response.data.total_merges);
        setHighestMergesMetric(response.data.project_with_highest_merges);
        setTotalDeclinedMerges(response.data.total_declined_merges);
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

  const getDataBlocks = () => {
    return (
      <Row className="px-4 justify-content-between">
        <Col md={12} className={"my-1"}>
          <GitHubCommitsTotalCommitsDataBlock data={totalCommits} />
        </Col>
        <Col md={12} className={"my-1"}>
          <GitHubCommitsTotalMergesDataBlock data={totalMerges} />
        </Col>
        <Col md={12} className={"my-1"}>
          <GitHubCommitsTotalPullRequestsDataBlock data={totalPullRequest} />
        </Col>
      </Row>
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(mostActiveUsersMetrics) || mostActiveUsersMetrics.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3">
        <Row>
          <Col md={3}>{getDataBlocks()}</Col>
          <Col md={3}>
            <div className="text-center col-12">
              <div className="font-inter-light-400 light-gray-text-secondary metric-block-footer-text">
                Highest Merges
              </div>
            </div>
            <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
              <ResponsivePie
                data={highestMergesMetric}
                {...defaultConfig("","",false, false, "","", true)}
                {...pieChartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
                onClick={() => setShowModal(true)}
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center col-12">
              <div className="font-inter-light-400 light-gray-text-secondary metric-block-footer-text">
                Total Declined Merges
              </div>
            </div>
            <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
              <ResponsivePie
                data={totalDeclinedMerges}
                {...defaultConfig("","",false, false, "","", true)}
                {...pieChartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
                onClick={() => setShowModal(true)}
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="text-center col-12">
              <div className="font-inter-light-400 light-gray-text-secondary metric-block-footer-text">
                Total Merges
              </div>
            </div>
            <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
              <ResponsiveBar
                data={mostActiveUsersMetrics}
                {...defaultConfig("Users", "Total Merges", true, false, "cutoffString", "wholeNumbers", true)}
                {...config(METRIC_THEME_CHART_PALETTE_COLORS)}
                {...adjustBarWidth(mostActiveUsersMetrics, false)}
              />
            </div>
          </Col>
        </Row>
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
