import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import CustomTable from "components/common/table/CustomTable";
import "components/analytics/charts/charts.css";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  getLimitedTableTextColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import bitbucketRejectedMergeRequestsMetadata from "components/insights/charts/bitbucket/table/bitbucket-rejected-merge-requests/bitbucket-rejected-merge-requests-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import ChartDetailsOverlay from "components/insights/charts/detail_overlay/ChartDetailsOverlay";
import {ANALYTICS_TEXT_CONSTANTS} from "components/common/constants/text/analytics/analytics.text.constants";

function BitbucketRejectedMergeRequestsTable({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const toastContext = useContext(DialogToastContext);
  const fields = bitbucketRejectedMergeRequestsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "bitbucketRejectedPullRequests",
        kpiConfiguration,
        dashboardTags,
        tableFilterDto
      );
      let dataObject = response?.data?.data[0]?.bitbucketRejectedPullRequests?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data?.data[0]?.bitbucketRejectedPullRequests?.count);
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

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "AuthorName")),
      getTableTextColumn(getField(fields, "AssigneeName")),
      getLimitedTableTextColumn(getField(fields, "MergeRequestTitle"), 25),
      getTableTextColumn(getField(fields, "BranchName")),
      getTableTextColumn(getField(fields, "ProjectName")),
      getLimitedTableTextColumn(getField(fields, "RejectedReason"), 25),
      getTableDateTimeColumn(getField(fields, "mrCompletionTimeTimeStamp"))
    ],
    []
  );
  const onRowSelect = (rowData) => {
    const chartModel = new Model({...rowData.original}, bitbucketRejectedMergeRequestsMetadata, false);
    toastContext.showOverlayPanel(<ChartDetailsOverlay chartModel={chartModel} kpiIdentifier={"bitbucket-rejected-merge-requests"} />);
  };

  const getChartTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={ANALYTICS_TEXT_CONSTANTS.NO_CHART_DATA_MESSAGE}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        scrollOnLoad={false}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <ChartContainer
      tableChart={true}
      kpiConfiguration={kpiConfiguration}
      setKpiConfiguration={setKpiConfiguration}
      chart={getChartTable()}
      loadChart={loadData}
      dashboardData={dashboardData}
      index={index}
      error={error}
      setKpis={setKpis}
      isLoading={isLoading}
    />
  );
}

BitbucketRejectedMergeRequestsTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default BitbucketRejectedMergeRequestsTable;
