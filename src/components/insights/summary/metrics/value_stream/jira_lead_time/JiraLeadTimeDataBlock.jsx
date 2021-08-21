import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import InsightsSynopsisDataBlock from "components/common/data_boxes/InsightsSynopsisDataBlock";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";

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
    toggleDynamicPanel("jiraLeadTime", metrics[0]?.data);
  };

  const getChartBody = () => {
    return (
      <div
        className={
          selectedDataBlock === "jiraLeadTime" ? "selected-data-block" : undefined }
        style={style}
      >
        <InsightsSynopsisDataBlock
          title={
            !isLoading && metrics[0]? (
                metrics[0].data[0].mean
            ) : (
                !isLoading ? 0 : (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        fixedWidth
                        className="mr-1"
                    />
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
