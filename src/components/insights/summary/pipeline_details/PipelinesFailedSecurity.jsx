import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import DataBlock from "components/common/data_boxes/DataBlock";
import BuildDetailsMetadata from "components/insights/summary/build-details-metadata";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";

function PipelineFailedSecurity({ dashboardData, toggleDynamicPanel }) {
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
        "summaryPipelinesFailedSecurity",
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
    toggleDynamicPanel("Pipelines Failing Security Step", metrics[0]?.data);
  };

  const getChartBody = () => {
    return (
      <DataBlock
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
        subTitle="Pipelines Failing Security Step"
        toolTipText="Pipelines Failing Security Step"
        clickAction={() => onDataBlockSelect()}
        statusColor="danger"
      />
    );
  };

  return getChartBody();
}

PipelineFailedSecurity.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default PipelineFailedSecurity;
