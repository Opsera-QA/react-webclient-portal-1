import React, {useEffect, useContext, useState, useMemo, useRef} from "react";
import CustomTable from "components/common/table/CustomTable";
import {AuthContext} from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import {
  getChartPipelineStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import opseraRecentPipelineStatusMetadata
  from "components/insights/charts/opsera/table/recent_pipeline_status/opsera-recent-pipeline-status-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import Model from "core/data_model/model";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import { useHistory } from "react-router-dom";

function OpseraRecentPipelineStatus({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis, dataPresent, setDataPresent}) {
  const history = useHistory();
  const fields = opseraRecentPipelineStatusMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [mockDataShown, setMockDataShown] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(new Model({...genericChartFilterMetadata.newObjectFields}, genericChartFilterMetadata, false));
  const mockData = [
    {
        "_id": {
            "id": "615672c363b31fddb73b3b3a",
            "pipelineId": "AKS Azure Functions Test Automation DO NOT DELETE",
            "run": 177
        },
        "pipelineId": "AKS Azure Functions Test Automation DO NOT DELETE-177",
        "pipeline_name": "AKS Azure Functions Test Automation DO NOT DELETE",
        "run_count": 177,
        "duration": 58.21,
        "status": "failure",
        "timestamp": "2022-09-01T18:22:34.995Z"
    },
    {
        "_id": {
            "id": "615672c363b31fddb73b3b3a",
            "pipelineId": "AKS Azure Functions Test Automation DO NOT DELETE",
            "run": 176
        },
        "pipelineId": "AKS Azure Functions Test Automation DO NOT DELETE-176",
        "pipeline_name": "AKS Azure Functions Test Automation DO NOT DELETE",
        "run_count": 176,
        "duration": 2.7,
        "status": "failure",
        "timestamp": "2022-09-01T16:32:52.136Z"
    },
    {
        "_id": {
            "id": "61396fc8b4248c4b40a78bee",
            "pipelineId": "AKS Azure Deploy Test Automation DO NOT DELETE",
            "run": 87
        },
        "pipelineId": "AKS Azure Deploy Test Automation DO NOT DELETE-87",
        "pipeline_name": "AKS Azure Deploy Test Automation DO NOT DELETE",
        "run_count": 87,
        "duration": 2.7,
        "status": "failure",
        "timestamp": "2022-09-01T16:30:50.307Z"
    },
    {
        "_id": {
            "id": "61396fc8b4248c4b40a78bee",
            "pipelineId": "AKS Azure Deploy Test Automation DO NOT DELETE",
            "run": 86
        },
        "pipelineId": "AKS Azure Deploy Test Automation DO NOT DELETE-86",
        "pipeline_name": "AKS Azure Deploy Test Automation DO NOT DELETE",
        "run_count": 86,
        "duration": 1.52,
        "status": "failure",
        "timestamp": "2022-09-01T16:25:02.059Z"
    },
    {
        "_id": {
            "id": "60e713a24a0da574aa6f2b0b",
            "pipelineId": "Terraform Test Automation DO NOT DELETE",
            "run": 314
        },
        "pipelineId": "Terraform Test Automation DO NOT DELETE-314",
        "pipeline_name": "Terraform Test Automation DO NOT DELETE",
        "run_count": 314,
        "duration": 55.34,
        "status": "failure",
        "timestamp": "2022-09-01T15:57:30.888Z"
    }
];

  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "run_count"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableDateTimeColumn(getField(fields, "timestamp")),
      getTableTextColumn(getField(fields, "duration")),
      getChartPipelineStatusColumn(getField(fields, "status"))
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData.original._id.id}/${rowData.original.run_count}`);
  };

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
      // let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetricsFreeTrial(getAccessToken, cancelSource, "opseraPipelineInfo", kpiConfiguration, filterDto);
    let dataObject = response?.data?.data[0]?.opseraPipelineInfo?.data;
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", response?.data[0]?.opseraPipelineInfo?.count);
        setTableFilterDto({...newFilterDto});
      }
      if (dataObject?.length < 1) {
        setMetrics(mockData);
        setMockDataShown(true);
      }
      if (mockDataShown) {
        setDataPresent(false);
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
        // onRowSelect={onRowSelect}
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
        tableChart={true}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        dataPresent={mockDataShown}
      />
    </div>
  );
}

OpseraRecentPipelineStatus.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  dataPresent: PropTypes.bool,
  setDataPresent: PropTypes.func
};

export default OpseraRecentPipelineStatus;
