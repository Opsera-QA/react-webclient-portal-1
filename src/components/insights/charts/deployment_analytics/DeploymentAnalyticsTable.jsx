import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";

import {
  getLimitedTableTextColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import DeploymentAnalyticsMetadata from "./deployment-analytics-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";

function DeploymentAnalyticsTable({ kpiConfiguration, metadataName, dashboardData }) {
  const fields = DeploymentAnalyticsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({ ...genericChartFilterMetadata.newObjectFields }, genericChartFilterMetadata, false)
  );
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getLimitedTableTextColumn(getField(fields,"artifactoryName"), 20),
      getTableTextColumn(getField(fields,"pipelineName")),
      getTableTextColumn(getField(fields,"runCount")),
      getTableTextColumn(getField(fields,"status")),
      getTableTextColumn(getField(fields,"version")),
      getLimitedTableTextColumn(getField(fields,"destination"),30),
    ],
    []
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
      const response = await chartsActions.getDeploymentAnalytics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        metadataName,
        filterDto
      );
      let dataObject = response?.data?.data[0]?.data;
        console.log(response?.data?.data[0]?.data,'***Test table');
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.count[0].count);
        setTableFilterDto({ ...newFilterDto });
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
  const onRowSelect = (rowData) => {
    setModalData(rowData.original);
    setShowModal(true);
  };

  

  return (
    <CustomTable
    columns={columns}
    data={metrics}
    noDataMessage={noDataMessage}
    paginationDto={tableFilterDto}
    setPaginationDto={setTableFilterDto}
    loadData={loadData}
    scrollOnLoad={false}
    onRowSelect={onRowSelect}
  />
  );
}

DeploymentAnalyticsTable.propTypes = {
 metadataName:PropTypes.string.isRequired,
 kpiConfiguration: PropTypes.object,
 dashboardData: PropTypes.object,

};

export default DeploymentAnalyticsTable;
