import React, { useMemo, useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import Model from "core/data_model/model";
import axios from "axios";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
  getTableDurationTextColumn,
} from "components/common/table/table-column-helpers";
import { getDurationInDaysHours } from "components/common/table/table-column-helpers-v2";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import { getField } from "components/common/metadata/metadata-helpers";
import githubActionsWorkflowActions from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import { githubOpenPullRequestStatisticsMetadata } from "components/insights/charts/github/line_chart/open_pull_request_average_time/githubOpenPullRequestStatistics.metadata";
import CustomTable from "components/common/table/CustomTable";
import { metricHelpers } from "components/insights/metric.helpers";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function GithubOpenPullRequestStatisticsOverlay({
  data,
  closePanel,
  kpiConfiguration,
  dashboardData,
}) {
  let fields = githubOpenPullRequestStatisticsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const noDataMessage = "No data available";
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...genericChartFilterMetadata.newObjectFields },
      genericChartFilterMetadata,
      false,
    ),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "repo")),
      getTableTextColumn(getField(fields, "title")),
      getTableTextColumn(getField(fields, "source")),
      getTableTextColumn(getField(fields, "target")),
      getTableTextColumn(getField(fields, "user")),
      getTableTextColumn(getField(fields, "changedFiles")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
      getDurationInDaysHours(getField(fields, "timeSinceCreated")),
      getTableTextColumn(getField(fields, "url")),
    ],
    [],
  );

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

  const loadData = async (
    cancelSource = cancelTokenSource,
    filterDto = filterModel,
  ) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(
        dashboardData?.data?.filters,
      );
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      let bucket = data?.data?.x;
      const response =
        await githubActionsWorkflowActions.githubOpenPullRequestStatisticsOverlay(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs,
          dashboardFilters,
          bucket,
        );
      console.log(response);
      let dataObject = response?.data;

      if (isMounted?.current === true && response) {
        setMetrics(dataObject);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Github Open Pull Requests`}
      showToasts={true}
    >
      <CustomTable
        nextGeneration={true}
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        // paginationDto={filterModel}
        // setPaginationDto={setFilterModel}
      />
    </FullScreenCenterOverlayContainer>
  );
}

GithubOpenPullRequestStatisticsOverlay.propTypes = {
  data: PropTypes.array,
  closePanel: PropTypes.func,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GithubOpenPullRequestStatisticsOverlay;
