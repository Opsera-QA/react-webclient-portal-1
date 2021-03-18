import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import CustomTable from "components/common/table/CustomTable";
import "components/analytics/charts/charts.css";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import bitbucketPendingMergeRequestsMetadata from "components/insights/charts/bitbucket/table/bitbucket-pending-merge-requests/bitbucket-pending-merge-requests-metadata";
import { getField } from "components/common/metadata/metadata-helpers";
import { format } from "date-fns";

function BitbucketPendingMergeRequests({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const fields = bitbucketPendingMergeRequestsMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "bitbucketPendingMergeRequests",
        kpiConfiguration
      );
      let dataObject = response?.data?.data[0]?.bitbucketPendingMergeRequests?.data;

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

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "AuthorName")),
      getTableTextColumn(getField(fields, "AssigneeName")),
      getTableTextColumn(getField(fields, "MergeRequestTitle")),
      getTableTextColumn(getField(fields, "BranchName")),
      getTableTextColumn(getField(fields, "ProjectName")),
      {
        Header: "Time",
        accessor: "mrCompletionTimeTimeStamp",
        Cell: (props) => {
          return format(new Date(props.value), "yyyy-MM-dd', 'hh:mm a");
        },
      },
    ],
    []
  );

  return (
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={<CustomTable columns={columns} data={metrics} noDataMessage={noDataMessage} />}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
      />
    </div>
  );
}

BitbucketPendingMergeRequests.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default BitbucketPendingMergeRequests;
