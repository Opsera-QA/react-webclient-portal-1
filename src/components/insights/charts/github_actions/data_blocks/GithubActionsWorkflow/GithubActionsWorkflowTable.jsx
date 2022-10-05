import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { githubActionsWorkflowMetadata } from "./githubActionsWorkflow.metadata";
import CustomTable from "../../../../../common/table/CustomTable";
import { getTableTextColumn } from "../../../../../common/table/table-column-helpers";
import { getField } from "../../../../../common/metadata/metadata-helpers";
import FilterContainer from "../../../../../common/table/FilterContainer";
import Model from "../../../../../../core/data_model/model";
import axios from "axios";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import chartsActions from "../../../charts-actions";
import { DialogToastContext } from "../../../../../../contexts/DialogToastContext";
import ExportGithubActionsWorkflowReportButton from "./export/ExportGithubActionWorkflowReportButton";
import ExportGithubActionsWorkflowReportPanel from "./export/ExportGithubActionsWorkflowReportPanel";
import GithubActionsWorkflowActionableInsightOverlay
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";

function GithubActionsWorkflowTable({
  kpiConfiguration,
  dashboardData,
  setError,
}) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [metrics, setMetrics] = useState([
    {
      _id: "promote-e2",
      repos: 11,
      runs: 190,
      success: 43,
      failures: 147,
      successTime: 115.83333333333333,
      failedTime: 0,
      successPercentage: 22.63,
      failedPercentage: 77.37,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...githubActionsWorkflowMetadata.newObjectFields },
      githubActionsWorkflowMetadata,
      false,
    ),
  );
  const toastContext = useContext(DialogToastContext);

  const noDataMessage = "No data available";

  const fields = githubActionsWorkflowMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "runs")),
      getTableTextColumn(getField(fields, "repos")),
      getTableTextColumn(getField(fields, "success")),
      getTableTextColumn(getField(fields, "failures")),
      getTableTextColumn(getField(fields, "successPercentage")),
      getTableTextColumn(getField(fields, "failedPercentage")),
      getTableTextColumn(getField(fields, "successTime")),
      getTableTextColumn(getField(fields, "failedTime")),
    ],
    [],
  );

  const loadData = async (
    filterDto = filterModel,
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsBaseKPITable",
        kpiConfiguration,
        dashboardTags,
        filterModel,
      );
      let dataObject = response?.data?.data[0];
      if (
        isMounted?.current === true &&
        dataObject &&
        Array.isArray(dataObject?.data)
      ) {
        setMetrics(dataObject?.data);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        //setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
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

  const onRowSelect = (rowData) => {
    toastContext.showInfoOverlayPanel(
      <GithubActionsWorkflowActionableInsightOverlay
        workflowName={rowData.original._id}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />,
    );
  };

  const getBody = () => {
    return (
      <FilterContainer
        body={getTable()}
        metadata={metrics}
        isLoading={isLoading}
        title={"Github Actions Workflow Summary"}
        className={"px-2 pb-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        supportSearch={true}
        exportButton={
          <ExportGithubActionsWorkflowReportButton
            className={"ml-2"}
            setShowExportPanel={setShowExportPanel}
            showExportPanel={showExportPanel}
          />
        }
      />
    );
  };
  const getTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportGithubActionsWorkflowReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          githubActionData={metrics}
        />
      );
    }

    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        onRowSelect={onRowSelect}
      />
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

GithubActionsWorkflowTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  setError: PropTypes.func,
};

export default GithubActionsWorkflowTable;
