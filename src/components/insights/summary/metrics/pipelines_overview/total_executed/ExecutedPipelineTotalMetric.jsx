import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import InsightsSynopsisDataBlock from "components/common/data_boxes/InsightsSynopsisDataBlock";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import InsightsPipelineDetailsTable from "components/insights/summary/metrics/InsightsPipelineDetailsTable";
import LoadingIcon from "components/common/icons/LoadingIcon";

function ExecutedPipelineTotalMetric({ dashboardData, toggleDynamicPanel, selectedDataBlock, style }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...genericChartFilterMetadata.newObjectFields },
      genericChartFilterMetadata,
      false
    )
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
    filterDto = tableFilterDto
  ) => {
    try {
      setIsLoading(true);
      // TODO: Handle pagination
      tableFilterDto.setData("pageSize", 1000);
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
        "summaryTotalPipelines",
        null,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        dateRange
      );
      let dataObject = response?.data
        ? response?.data?.data[0]
        : [{ data: [], count: [{ count: 0 }] }];
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataObject[0]?.count[0]?.count);
      setTableFilterDto({ ...newFilterDto });

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
    toggleDynamicPanel("total_executed_pipelines", getDynamicPanel());
  };

  const getDynamicPanel = () => {
    return (
      <InsightsPipelineDetailsTable
        data={metrics[0]?.data}
        tableTitle="Executed Pipeline Runs"
      />
    );
  };

  const getChartBody = () => {
    return (
      <div className={selectedDataBlock === "total_executed_pipelines" ? "selected-data-block" : undefined} style={style}>
        <InsightsSynopsisDataBlock
          title={
            !isLoading && metrics[0]?.count[0] ? (
              metrics[0]?.count[0]?.count
            ) : (
              <LoadingIcon className={"mr-1"}/>
            )
          }
          subTitle="Total Number of Pipelines Executed"
          toolTipText="Total Number of Pipelines Executed"
          clickAction={() => onDataBlockSelect()}
        />
      </div>
    );
  };

  return getChartBody();
}

ExecutedPipelineTotalMetric.propTypes = {
  selectedDataBlock: PropTypes.string,
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  style:PropTypes.object
};

export default ExecutedPipelineTotalMetric;
