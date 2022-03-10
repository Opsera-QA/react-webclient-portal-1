import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import InsightsSynopsisDataBlock from "components/common/data_boxes/InsightsSynopsisDataBlock";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import InsightsPipelineDetailsDurationTable
  from "components/insights/summary/metrics/pipelines_average_duration/InsightsPipelineDetailsDurationTable";
import LoadingIcon from "components/common/icons/LoadingIcon";

function AveragePipelineDeploymentDurationMetric({ dashboardData, toggleDynamicPanel, selectedDataBlock, style }) {
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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dateRange = dashboardData?.data?.filters[
        dashboardData?.data?.filters.findIndex(
          (obj) => obj.type === "date"
        )
      ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "opseraRecentCDStatus",
        null,
        dashboardTags,
        filterDto,
        null,
        null,
        null,
        null,
        dateRange
      );
      let dataObject = response?.data?.data[0]?.opseraRecentCDStatus?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.opseraRecentCDStatus?.count);
        setTableFilterDto({...newFilterDto});
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const onDataBlockSelect = () => {
    toggleDynamicPanel("average_deployment_duration", getDynamicPanel());
  };

  const getDynamicPanel = () => {
    return (
      <InsightsPipelineDetailsDurationTable
        data={metrics}
        tableTitle="Average Deployment Duration (Mins)"
      />
    );
  };

  const getAverage = ()=>{
    let sum = 0;
    for(let pipeline of metrics){
        sum += pipeline.duration;
    }
    return (sum / metrics.length).toFixed(2);
  };

  const getChartBody = () => {
    return (
      <div className={selectedDataBlock === "average_deployment_duration" ? "selected-data-block" : undefined} style={style}>
        <InsightsSynopsisDataBlock
          title={
            !isLoading && metrics[0] ? (
              getAverage()
            ) : !isLoading ? 0 : (
              <LoadingIcon className={"mr-1"}/>
            )
          }
          subTitle="Average Deployment Duration (Mins)"
          toolTipText="Average Deployment Duration (Mins)"
          clickAction={() => onDataBlockSelect()}
        />
      </div>
    );
  };

  return getChartBody();
}

AveragePipelineDeploymentDurationMetric.propTypes = {
  selectedDataBlock: PropTypes.string,
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  style:PropTypes.object
};

export default AveragePipelineDeploymentDurationMetric;
