import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import gitlabAction from "../../gitlab.action";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import Model from "../../../../../../core/data_model/model";
import actionableInsightsGenericChartFilterMetadata from "../../../generic_filters/actionableInsightsGenericChartFilterMetadata";
import { DialogToastContext } from "../../../../../../contexts/DialogToastContext";
import { metricHelpers } from "../../../../metric.helpers";
import GitlabMergeRequestActionableRepoTable from "./GitlabOpenMergeActionableRepoTable";

function GitlabOpenMergeActionableRepoOverlay({
  kpiConfiguration,
  dashboardData,
  range,
  icon,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [totalCount, setTotalCount] = useState([]);
  const [chartData, setChartData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false,
    ),
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
  }, []);

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

      const response = await gitlabAction.getRepoOpenActionable(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
        filterDto,
      );
      let dataObject = response?.data ? response?.data[0]?.pipelines : [];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setTotalCount(totalCount);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data[0]?.count[0]?.count);
        setFilterModel({ ...newFilterDto });
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

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <div className={"p-3"}>
      <GitlabMergeRequestActionableRepoTable
        isLoading={isLoading}
        data={metrics}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
        loadData={loadData}
        range={range}
        count={totalCount}
        tableTitleIcon={icon}
      />
    </div>
  );
}

GitlabOpenMergeActionableRepoOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  range: PropTypes.string,
  icon: PropTypes.object,
};

export default GitlabOpenMergeActionableRepoOverlay;
