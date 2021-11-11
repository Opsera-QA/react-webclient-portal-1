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
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";

function OpseraRecentCDStatusTable({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  
  const toastContext = useContext(DialogToastContext);
  const fields = opseraRecentCdStatusMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({...genericChartFilterMetadata.newObjectFields}, genericChartFilterMetadata, false));

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
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "opseraRecentCDStatus",
        kpiConfiguration,
        dashboardTags,
        filterDto
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

  const onRowSelect = (rowData) => {    
    toastContext.showOverlayPanel(<BlueprintLogOverlay pipelineId={rowData?.original?.pipeline_id} runCount={rowData?.original?.run_count} />);    
  };

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "run_count"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "step_name")),
      getTableTextColumn(getField(fields, "tool")),
      getTableTextColumn(getField(fields, "duration")),
      getChartPipelineStatusColumn(getField(fields, "status")),
    ],
    []
  );

  const getChartTable = () => {
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
    <div>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartTable()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        tableChart={true}
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
