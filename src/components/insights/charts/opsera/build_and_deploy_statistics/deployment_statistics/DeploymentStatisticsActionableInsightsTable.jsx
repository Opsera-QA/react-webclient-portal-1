import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import DeploymentStatisticsActionableInsightsMetadata from "./deployment-statistics-actionable-insights-metadata";
import { getTableTextColumn, getTableTextColumnWithoutField } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass, faExternalLink } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";
import TotalDeployments from "../data_blocks/TotalDeployments";
import SuccessfulBuildsDeployments from "../data_blocks/SuccessfulBuildsDeployments";
import FailedBuildsDeployments from "../data_blocks/FailedBuildsDeployments";
import AverageDuration from "../data_blocks/AverageDuration";
import AverageDurationToResolve from "../data_blocks/AverageDurationToResolve";
import TotalDurationToResolve from "../data_blocks/TotalDurationToResolve";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import IconBase from "components/common/icons/IconBase";
import SalesforceDurationByStageActionableInsightsTable
    from "../../../sfdc/bar_chart/duration_by_stage/actionable_insights/SalesforceDurationByStageActionableInsightTable";
import SalesforceDurationByStageTasksActionableTable
    from "../../../sfdc/bar_chart/duration_by_stage/actionable_insights/SalesforceDurationByStageTasksActionableTable";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import DeploymentStatisticsTasksActionableTable from "./DeploymentStatisticsActionableTasksTable";
import TabPanelContainer from "../../../../../common/panels/general/TabPanelContainer";

function DeploymentStatisticsActionableInsightsTable({ kpiConfiguration, dashboardData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );
  const [tableFilterDto2, setTableFilterDto2] = useState(
      new Model(
          { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
          actionableInsightsGenericChartFilterMetadata,
          false
      )
  );
  const toastContext = useContext(DialogToastContext);
    const [activeTab, setActiveTab] = useState("pipelines");
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentStatsData, setDeploymentStatsData] = useState([]);
  const [quickDeployStats, setQuickDeployStats] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [deploymentSummaryData, setDeploymentSummaryData] = useState(undefined);

  const noDataMessage = "Opsera Deployment Statistics report is currently unavailable at this time";

  const fields = DeploymentStatisticsActionableInsightsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipelineName")),
      getTableTextColumn(getField(fields, "total")),
      getTableTextColumn(getField(fields, "success")),
      getTableTextColumn(getField(fields, "failure")),
      getTableTextColumn(getField(fields, "duration")),
      getTableTextColumn(getField(fields, "timeToResolve")),
      getTableTextColumnWithoutField("Actions", "_blueprint"),
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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "opseraDeployActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs
      );

      if (isMounted?.current === true && response?.status === 200) {
        const deploymentData = response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.data;

        await setDeploymentStatsData(
          deploymentData.map((dd, index) => ({
            ...dd,
            _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
          }))
        );
        const quickDeploy = response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.quickdeploy[0].data;
        await setQuickDeployStats(
            quickDeploy.map((dd, index) => ({
              ...dd,
              _blueprint: <IconBase icon={faExternalLink} className={"mr-2"} />,
            }))
        );

        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",
          response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.count[0]?.count
        );
        setTableFilterDto({ ...newFilterDto });
        let newFilterDto2 = filterDto;
        newFilterDto2.setData(
            "totalCount",
            response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.quickdeploy[0]?.count[0]?.count
        );
        setTableFilterDto2({ ...newFilterDto2 });
        setDeploymentSummaryData(response?.data?.data[0]?.opseraDeploymentActionableInsights?.data[0]?.summaryData[0]);
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

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };


    const getTabs = () => {
        if (activeTab == "pipelines") {
            return (
                <FilterContainer
                    isLoading={isLoading}
                    title={`Opsera Deployment Statistics Report`}
                    titleIcon={faDraftingCompass}
                    body={getTable()}
                    className={"px-2 pb-2"}
                />
            );
        } else if (activeTab == "jobs") {
            return (
                <DeploymentStatisticsTasksActionableTable
                    dashboardData={dashboardData}
                    kpiConfiguration={kpiConfiguration}
                    data={quickDeployStats}
                    isLoading={isLoading}
                    loadData={loadData}
                    filterModel={tableFilterDto2}
                    setFilterModel={setTableFilterDto2}
                />
            );
        }
    };

    const handleTabClick = (tabSelection) => (e) => {
        e.preventDefault();
        setActiveTab(tabSelection);
    };

    const getTabContainer = () => {
        return (
            <CustomTabContainer>
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Pipelines"}
                    handleTabClick={handleTabClick}
                    tabName={"pipelines"}
                />
                <CustomTab
                    activeTab={activeTab}
                    tabText={"Tasks"}
                    handleTabClick={handleTabClick}
                    tabName={"jobs"}
                />
            </CustomTabContainer>
        );
    };

  const getBody = () => {
    return (
      <>
        {getDeploymentSummaryDetails()}
          <div className={"p-3"}>
              <TabPanelContainer currentView={getTabs()} tabContainer={getTabContainer()} />
          </div>
      </>
    );
  };

  const getDeploymentSummaryDetails = () => {
    if (!deploymentSummaryData) {
      return null;
    }
    Math.round(deploymentSummaryData?.avgTimeToResolve);
    return (
      <Row className="pb-3 px-2">
        <Col lg={4} md={6} className="mt-3">
          <TotalDeployments displayValue={deploymentSummaryData?.total} displayText="Total Deployments" />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <SuccessfulBuildsDeployments
            displayValue={deploymentSummaryData?.success}
            displayText="Successful Deployments"
          />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <FailedBuildsDeployments displayValue={deploymentSummaryData?.failure} displayText="Failed Deployments" />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <AverageDuration displayValue={deploymentSummaryData?.avgDuration.toFixed(2)} />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <AverageDurationToResolve displayValue={deploymentSummaryData?.avgTimeToResolve.toFixed(2)} />
        </Col>
        <Col lg={4} md={6} className="mt-3">
          <TotalDurationToResolve displayValue={deploymentSummaryData?.timeToResolve} />
        </Col>
      </Row>
    );
  };

  const onRowSelect = (rowData) => {
    toastContext.showOverlayPanel(
      <BlueprintLogOverlay pipelineId={rowData?.original?.pipelineId} runCount={rowData?.original?.runCount} />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={deploymentStatsData}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
        loadData={loadData}
        onRowSelect={onRowSelect}
      />
    );
  };

  return <>{getBody()}</>;
}

DeploymentStatisticsActionableInsightsTable.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default DeploymentStatisticsActionableInsightsTable;
