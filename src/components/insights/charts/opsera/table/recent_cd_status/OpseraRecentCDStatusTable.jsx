import React, {useEffect, useContext, useState, useMemo, useRef} from "react";
import { AuthContext } from "contexts/AuthContext";
import CustomTable from "components/common/table/CustomTable";
import "components/analytics/charts/charts.css";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {getChartPipelineStatusColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import opseraRecentCdStatusMetadata
  from "components/insights/charts/opsera/table/recent_cd_status/opsera-recent-cd-status-metadata";
import {getField} from "components/common/metadata/metadata-helpers";

function OpseraRecentCDStatusTable({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const fields = opseraRecentCdStatusMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "opseraRecentCDStatus", kpiConfiguration);
      let dataObject = response?.data?.data[0]?.opseraRecentCDStatus?.data;

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "run_count"), "cell-center no-wrap-inline"),
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "step_name")),
      getTableTextColumn(getField(fields, "tool")),
      getTableTextColumn(getField(fields, "duration")),
      getChartPipelineStatusColumn(getField(fields, "status")),
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

OpseraRecentCDStatusTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default OpseraRecentCDStatusTable;
