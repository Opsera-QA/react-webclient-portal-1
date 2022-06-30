import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";

import {
  getLimitedTableTextColumn,
  getTableTextColumn,
  getTableDateTimeColumn,
} from "components/common/table/table-column-helpers";
import DeploymentAnalyticsMetadata from "./gitlab-recent-merge-requests-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import FilterContainer from "components/common/table/FilterContainer";

function GitlabPendingMergeRequestsTable({
  kpiConfiguration,
  ProjectName,
  dashboardData,
}) {
  const fields = DeploymentAnalyticsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...genericChartFilterMetadata.newObjectFields, pageSize:10 },
      genericChartFilterMetadata,
      false,
    ),
  );
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(undefined);

  const noDataMessage = "No Data is available for this chart at this time";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "AuthorName"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "AssigneeName")),
      getLimitedTableTextColumn(getField(fields, "MergeRequestTitle"), 20),
      getLimitedTableTextColumn(getField(fields, "ProjectName"), 20),
      getLimitedTableTextColumn(getField(fields, "BranchName"), 20),
      getTableDateTimeColumn(getField(fields, "mrCompletionTimeTimeStamp")),
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
    filterDto = tableFilterDto,
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
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabPendingMergeRequests",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        ProjectName,
      );
      let dataObject =
        response?.data?.data[0]?.gitlabPendingMergeRequests?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.gitlabPendingMergeRequests?.count,
        );
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

  const getTable = () => {
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
  };

  return (
    <FilterContainer
      filterDto={tableFilterDto}
      setFilterDto={setTableFilterDto}
      body={getTable()}
      isLoading={isLoading}
      loadData={loadData}
      supportSearch={true}
    />
  );
}

GitlabPendingMergeRequestsTable.propTypes = {
  ProjectName: PropTypes.string.isRequired,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitlabPendingMergeRequestsTable;
