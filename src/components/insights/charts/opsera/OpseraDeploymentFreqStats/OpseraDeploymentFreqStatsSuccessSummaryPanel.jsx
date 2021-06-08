<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import DataBlock from "components/common/data_boxes/DataBlock";
========
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import {useHistory} from "react-router-dom";
import CustomTable from "components/common/table/CustomTable";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {
  getChartPipelineStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "../../../../common/table/table-column-helpers";
import { getField } from "../../../../common/metadata/metadata-helpers";
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
import Model from "core/data_model/model";
import chartsActions from "components/insights/charts/charts-actions";
import DeploymentFrequencyInsightsTableMetadata from "components/insights/charts/opsera/OpseraDeploymentFreqStats/deployment-frequency-actionable-metadata.js";
import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";

<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
function TotalPipelinesExecuted({ dashboardData, toggleDynamicPanel }) {
  const { getAccessToken } = useContext(AuthContext);
========
function OpseraDeploymentFreqStatsSuccessSummaryPanel({ dashboardData, kpiConfiguration, setActiveTab }) {
  const history = useHistory();
  const toastContext = useContext(DialogToastContext);
  const fields = DeploymentFrequencyInsightsTableMetadata.fields;
  const {getAccessToken} = useContext(AuthContext);
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tableFilterDto, setTableFilterDto] = useState(
<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
    new Model(
      { ...genericChartFilterMetadata.newObjectFields },
      genericChartFilterMetadata,
      false
    )
========
    new Model({ ...genericChartFilterMetadata.newObjectFields }, DeploymentFrequencyInsightsTableMetadata, false)
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
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

<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
  const loadData = async (
    cancelSource = cancelTokenSource,
    filterDto = tableFilterDto
  ) => {
    try {
      setIsLoading(true);
      // TODO: Handle pagination
      tableFilterDto.setData("pageSize", 1000);
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
        "summaryTotalPipelines",
        null,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
      );
      let dataObject = response?.data
        ? response?.data?.data[0]
        : [{ data: [], count: [{ count: 0 }] }];
========
  const onRowSelect = (rowData) => {
    toastContext.clearOverlayPanel();
    history.push(`/blueprint/${rowData.original._id.id}/${rowData.original.run_count}`);
  };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "summaryPipelinesSuccessfulDeployment", null, dashboardTags, filterDto, null);
      let dataObject = response?.data ? response?.data?.data[0] : [{data: [], count: [{count: 0}]}];
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataObject[0]?.count[0]?.count);
      setTableFilterDto({ ...newFilterDto });

      if (isMounted?.current === true && dataObject) {
<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
        setMetrics(dataObject);
========
        setMetrics(dataObject[0]?.data);
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
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

<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
  const onDataBlockSelect = () => {
    toggleDynamicPanel("total_pipelines", metrics[0]?.data);
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
        subTitle="Total Number of Pipelines Executed"
        toolTipText="Total Number of Pipelines Executed"
        clickAction={() => onDataBlockSelect()}
========
  const noDataMessage = "No Data is available for this chart at this time";
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipeline_name")),
      getTableTextColumn(getField(fields, "run_count")),
      getChartPipelineStatusColumn(getField(fields, "status")),
      getTableDateTimeColumn(getField(fields, "timestamp")),
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
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
      />
    );
  };

<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
  return getChartBody();
========
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      {getChartTable()}
    </SummaryPanelContainer>
  );
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
}

OpseraDeploymentFreqStatsSuccessSummaryPanel.propTypes = {
  chartModel: PropTypes.object,
  setActiveTab: PropTypes.func,
  dashboardData: PropTypes.object,
<<<<<<<< HEAD:src/components/insights/summary/TotalPipelinesExecuted.jsx
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  setSelectedDataBlock: PropTypes.func,
};

export default TotalPipelinesExecuted;
========
  kpiConfiguration: PropTypes.object
};

export default OpseraDeploymentFreqStatsSuccessSummaryPanel;
>>>>>>>> master:src/components/insights/charts/opsera/OpseraDeploymentFreqStats/OpseraDeploymentFreqStatsSuccessSummaryPanel.jsx
