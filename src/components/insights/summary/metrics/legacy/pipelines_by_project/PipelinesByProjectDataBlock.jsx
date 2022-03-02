import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import DataBlock from "components/common/data_boxes/DataBlock";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import LoadingIcon from "components/common/icons/LoadingIcon";

function PipelinesByProjectDataBlock({ dashboardData, toggleDynamicPanel, selectedDataBlock }) {
  const {getAccessToken} = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [projectCount, setProjectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
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
      let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryProjectDetails", null, dashboardTags, filterDto, null, dashboardOrgs);
      let dataObject = response?.data ? response?.data?.data[0] : [];
      if (isMounted?.current === true && dataObject) {
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", dataObject[0]?.count[0]?.count);
        setTableFilterDto({ ...newFilterDto });
        setProjectCount(dataObject[0]?.count[0]?.count || 0);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const onDataBlockSelect = () => {
    toggleDynamicPanel("pipelines_by_project", []);
  };

  const getChartBody = () => {
    return (
      <div className={selectedDataBlock === "pipelines_by_project" ? "selected-data-block" : undefined}>
        <DataBlock
          title={
            !isLoading ? (
              projectCount
            ) : (
              <LoadingIcon className={"mr-1"}/>
            )
          }
          subTitle="Total Number of Pipeline Projects"
          toolTipText="Total Number of Pipeline Projects"
          clickAction={() => onDataBlockSelect()}
        />
      </div>
    );
  };

  return getChartBody();
}

PipelinesByProjectDataBlock.propTypes = {
  selectedDataBlock: PropTypes.string,
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
};

export default PipelinesByProjectDataBlock;
