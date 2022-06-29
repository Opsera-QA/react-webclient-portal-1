import React, {useEffect, useState, useRef, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import SuccessExecutionsActionableInsightsMetaData from "./SuccessExecutionsActionableInsightsMetaData";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";
import chartsActions from "../../../../charts-actions";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import Model from "../../../../../../../core/data_model/model";
import LoadingIcon from "../../../../../../common/icons/LoadingIcon";
import { getTableTextColumn, getTableDateTimeColumn } from "../../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../../common/metadata/metadata-helpers";
import VanitySetTabAndViewContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTab from "../../../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabView from "../../../../../../common/tabs/vertical_tabs/VanitySetTabView";
import CustomTable from "../../../../../../common/table/CustomTable";
import VanitySetTabViewContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import {DialogToastContext} from "../../../../../../../contexts/DialogToastContext";
import SuccessExecutionsDetailedActionableInsights from "./SuccessExecutionsDetailedActionableInsights";

function SuccessExecutionsActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [responseData, setResponseData] = useState(undefined);
  const [actionInsightsTraceabilityTable, setActionInsightsTraceabilityTable] = useState([]);
  const [tableFilterDto, setTableFilterDto] = useState([new Model({ ...SuccessExecutionsActionableInsightsMetaData.newObjectFields }, SuccessExecutionsActionableInsightsMetaData, false)]);
  const toastContext = useContext(DialogToastContext);

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

  const noDataMessage = "Success Executions report is currently unavailable at this time";

  const fields = SuccessExecutionsActionableInsightsMetaData.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "repositoryName")),
      getTableTextColumn(getField(fields, "actionName")),
      getTableTextColumn(getField(fields, "applicationDirector")),
      getTableTextColumn(getField(fields, "applicationSVP")),
      getTableTextColumn(getField(fields, "applicationVP1")),
      getTableTextColumn(getField(fields, "applicationVP2")),
      getTableTextColumn(getField(fields, "actionRunNumber")),
      getTableTextColumn(getField(fields, "jobName")),
      getTableDateTimeColumn(getField(fields, "stepCompletedAt")),
      getTableTextColumn(getField(fields, "stepName"))
    ],
    []
  );

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const dashboardTags =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardFilters =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "amexFilters")]
            ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "successRunsActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto[0],
        dashboardFilters,
        dashboardOrgs
      );
      const data = response?.data?.data[0];
      const actionableInsightsTableData = response?.data?.data[0]?.actionableInsightsReport;
      let newFilterDto = Object.assign([], tableFilterDto);
      for(let i = 0; i <= actionableInsightsTableData.length - 1; i++) {
        if(!newFilterDto[i]) {
          newFilterDto.push(new Model({ ...SuccessExecutionsActionableInsightsMetaData.newObjectFields }, SuccessExecutionsActionableInsightsMetaData, false));
        }
        newFilterDto[i]['totalCount'] = actionableInsightsTableData[i]?.docs ? actionableInsightsTableData[i]?.count : 0;
      }
      setTableFilterDto(newFilterDto);
      setResponseData(data);
      setActionInsightsTraceabilityTable(actionableInsightsTableData);
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
    toastContext.showInfoOverlayPanel(
      <SuccessExecutionsDetailedActionableInsights
        repositoryName={rowData?.original?.repositoryName}
        actionName={rowData?.original?.actionName}
        headCommitSha={rowData?.original?.headCommitSha}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }
    if(!responseData) {
      return null;
    }
    return (
      <>
        {getDateRange()}
        {getSuccessSummaryBlocks()}
        <VanitySetTabAndViewContainer
          className={"mb-3"}
          title={`List of Successful Workflow Steps by Application`}
          defaultActiveKey={actionInsightsTraceabilityTable?.[0]?.applicationName}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTable()}
        />
      </>
    );
  };

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const getVerticalTabContainer = () => {
    if(!actionInsightsTraceabilityTable || actionInsightsTraceabilityTable.length === 0) {
      return null;
    }
    const tabs = [];
    for(let i = 0; i <= actionInsightsTraceabilityTable.length - 1; i++) {
      tabs.push(
        <VanitySetVerticalTab
          tabText={actionInsightsTraceabilityTable[i]?.applicationName}
          tabName={actionInsightsTraceabilityTable[i]?.applicationName}
        />
      );
    }
    return (
      <div className={"h-100"}>
        <div style={{backgroundColor:"#F3F3F1",border:"1px solid #e4e4e4"}} className={"py-2 w-100 px-2"}>
          <div>Application Name</div>
        </div>
        <VanitySetVerticalTabContainer className={"h-100"}>
          {tabs}
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  const getTable = () => {
    if(!actionInsightsTraceabilityTable || actionInsightsTraceabilityTable.length === 0) {
      return null;
    }
    const projectData = [];
    for(let i = 0; i <= actionInsightsTraceabilityTable.length - 1; i++) {
      projectData.push(
        <VanitySetTabView tabKey={actionInsightsTraceabilityTable[i]?.applicationName}>
          <CustomTable
            columns={columns}
            data={actionInsightsTraceabilityTable[i]?.docs}
            noDataMessage={noDataMessage}
            paginationDto={tableFilterDto[i]}
            setPaginationDto={setTableFilterDto}
            loadData={loadData}
            onRowSelect={onRowSelect}
          />
        </VanitySetTabView>
      );
    }
    return (
      <VanitySetTabViewContainer className={"p-2"}>
        {projectData}
      </VanitySetTabViewContainer>
    );
  };

  const getSuccessSummaryBlocks = () => {
    return (
      <Row className="pb-3 px-2">
        <Col lg={6} md={6} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalRepositoryCounts?.[0]?.successCount}
              subtitle={'Total Repositories'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={6} md={6} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalWorkflowsCounts?.[0]?.successCount}
              subtitle={'Total Workflows'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalSuccessfulBuilds}
              subtitle={'Total Builds'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-3"
              score={responseData?.totalSuccessfulScans}
              subtitle={'Total Security'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalSuccessfulTests}
              subtitle={'Total Quality'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalE1SuccessfulDeploy}
              subtitle={'Total E1 Deployments'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalE2SuccessfulDeploy}
              subtitle={'Total E2 Deployments'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalE3SuccessfulDeploy}
              subtitle={'Total E3 Deployments'}
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

SuccessExecutionsActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SuccessExecutionsActionableInsights;
