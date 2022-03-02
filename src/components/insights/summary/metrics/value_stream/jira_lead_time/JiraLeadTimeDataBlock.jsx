import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import InsightsSynopsisDataBlock from "components/common/data_boxes/InsightsSynopsisDataBlock";
import JiraLeadTimeChartNoDataBlocks
  from "components/insights/charts/jira/line_chart/lead_time/JiraLeadTimeChartNoDataBlocks";
import LoadingIcon from "components/common/icons/LoadingIcon";

function PipelineFailedSecurity({
  dashboardData,
  toggleDynamicPanel,
  selectedDataBlock,
  style,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const loadData = async ( cancelSource = cancelTokenSource ) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations"
          )
        ]?.value;
      let dateRange = dashboardData?.data?.filters[
        dashboardData?.data?.filters.findIndex(
          (obj) => obj.type === "date"
        )
      ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "jiraLeadTime",
        null,
        dashboardTags,
        null,
        null,
        dashboardOrgs,
        null,
        null,
        dateRange
      );
      let dataObject =
        response?.data && response?.data?.data[0]?.jiraLeadTime.status === 200
          ? response?.data?.data[0]?.jiraLeadTime?.data
          : [];
          
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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

  const onDataBlockSelect = () => {
    toggleDynamicPanel("jira_lead_time", getDynamicPanel());
  };

  const getDynamicPanel = () => {
    return (
      <JiraLeadTimeChartNoDataBlocks
        dashboardData={dashboardData}
        kpiConfiguration={{kpi_name: "Lead Time", filters: []}}
      />
    );
  };

  const getChartBody = () => {
    return (
      <div
        className={
          selectedDataBlock === "jira_lead_time" ? "selected-data-block" : undefined }
        style={style}
      >
        <InsightsSynopsisDataBlock
          title={
            !isLoading && metrics[0]? (
                metrics[0].data[0].mean
            ) : (
                !isLoading ? 0 : (
                    <LoadingIcon className={"mr-1"}/>
              )
            )
          }
          subTitle="Mean Lead Time (Days)"
          toolTipText="Mean Lead Time (Days)"
          clickAction={() => onDataBlockSelect()}
        />
      </div>
    );
  };

  return getChartBody();
}

PipelineFailedSecurity.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
  style: PropTypes.object,
};

export default PipelineFailedSecurity;
