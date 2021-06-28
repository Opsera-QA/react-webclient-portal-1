import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import DataBlock from "components/common/data_boxes/DataBlock";
import DataBlockInsights from "components/common/data_boxes/DatablockInsights";
import BuildDetailsMetadata from "components/insights/summary/build-details-metadata";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";

function PipelineDetails({ dashboardData, toggleDynamicPanel, selectedDataBlock , style }) {
  const fields = BuildDetailsMetadata.fields;
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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "summaryPipelinesSuccessfulDeployment",
        null,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
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
    toggleDynamicPanel("successful_pipelines_deployment", metrics[0]?.data);
  };

  const getChartBody = () => {
    return (
      <div className={selectedDataBlock === "successful_pipelines" ? "selected-data-block" : undefined} style={style}>
        <DataBlockInsights
          title={
            !isLoading && metrics[0]?.count[0] ? (
              metrics[0]?.count[0]?.count
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                fixedWidth
                className="mr-1"
              />
            )
          }
          subTitle="Successful Pipelines (Deployments)"
          toolTipText="Successful Pipelines (Deployments)"
          clickAction={() => onDataBlockSelect()}
          statusColor="success"
        />
      </div>
    );
  };

  return getChartBody();
}

PipelineDetails.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
  style: PropTypes.object
};

export default PipelineDetails;