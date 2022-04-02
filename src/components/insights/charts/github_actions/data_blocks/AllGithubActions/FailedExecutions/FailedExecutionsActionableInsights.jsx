import React, {useEffect, useState, useRef, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import FailedExecutionsActionableInsightsMetaData from "./FailedExecutionsActionableInsightsMetaData";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import chartsActions from "../../../../charts-actions";
import Model from "../../../../../../../core/data_model/model";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";
import LoadingIcon from "../../../../../../common/icons/LoadingIcon";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import CustomTable from "../../../../../../common/table/CustomTable";
import {getTableTextColumn} from "../../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../../common/metadata/metadata-helpers";
import VanitySetTabAndViewContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetVerticalTabContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetVerticalTab from "../../../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetTabView from "../../../../../../common/tabs/vertical_tabs/VanitySetTabView";import VanitySetTabViewContainer from "../../../../../../common/tabs/vertical_tabs/VanitySetTabViewContainer";

function FailedExecutionsActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [responseData, setResponseData] = useState(undefined);
  const [actionInsightsTraceabilityTable, setActionInsightsTraceabilityTable] = useState([]);
  const [tableFilterDto, setTableFilterDto] = useState([new Model({ ...FailedExecutionsActionableInsightsMetaData.newObjectFields }, FailedExecutionsActionableInsightsMetaData, false)]);

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

  const noDataMessage = "Failed Executions report is currently unavailable at this time";

  const fields = FailedExecutionsActionableInsightsMetaData.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "repositoryName")),
      getTableTextColumn(getField(fields, "actionName")),
      getTableTextColumn(getField(fields, "applicationSVP")),
      getTableTextColumn(getField(fields, "applicationVP2")),
      getTableTextColumn(getField(fields, "actionRunNumber")),
      getTableTextColumn(getField(fields, "jobName")),
      getTableTextColumn(getField(fields, "pointOfFailure"))
    ],
    []
  );

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

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
        "failedRunsActionableInsights",
        kpiConfiguration,
        dashboardTags,
        filterDto[0],
        null,
        dashboardOrgs
      );
      const data = response?.data?.data[0];
      const actionableInsightsTableData = response?.data?.data[0]?.actionableInsightsReport?.[0]?.data;
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
        {getFailedSummaryBlocks()}
        <VanitySetTabAndViewContainer
          className={"mb-3"}
          title={`Failed Executions`}
          defaultActiveKey={actionInsightsTraceabilityTable?.[0]?.applicationName}
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTable()}
        />
      </>
    );
  };

  const getVerticalTabContainer = () => {
    if(!actionInsightsTraceabilityTable || actionInsightsTraceabilityTable.length === 0) {
      return null;
    }
    const tabs = [];
    if (Array.isArray(actionInsightsTraceabilityTable) && actionInsightsTraceabilityTable.length > 0) {
      for(let i = 0; i <= actionInsightsTraceabilityTable.length - 1; i++) {
        tabs.push(
          <VanitySetVerticalTab
            tabText={actionInsightsTraceabilityTable[i]?.applicationName}
            tabName={actionInsightsTraceabilityTable[i]?.applicationName}
          />
        );
      }
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
      let newFilterDto = Object.assign([], tableFilterDto);
      if(!newFilterDto[i]) {
        newFilterDto.push(new Model({ ...FailedExecutionsActionableInsightsMetaData.newObjectFields }, FailedExecutionsActionableInsightsMetaData, false));
      }
      newFilterDto[i]['totalCount'] = actionInsightsTraceabilityTable[i]?.docs ? actionInsightsTraceabilityTable[i]?.docs.length : 0;
      projectData.push(
        <VanitySetTabView tabKey={actionInsightsTraceabilityTable[i]?.applicationName}>
          <CustomTable
            columns={columns}
            data={actionInsightsTraceabilityTable[i]?.docs}
            noDataMessage={noDataMessage}
            paginationDto={newFilterDto[i]}
            setPaginationDto={setTableFilterDto}
            loadData={loadData}
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

  const getFailedSummaryBlocks = () => {
    return (
      <Row className="pb-3 px-2">
        <Col lg={6} md={6} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalRepositoryCounts?.[0].failureCount}
              subtitle={'Total Repositories'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={6} md={6} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalWorkflowsCounts?.[0].failureCount}
              subtitle={'Total Workflows'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalFailedBuilds}
              subtitle={'Total Builds'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-3"
              score={responseData?.totalSecurity}
              subtitle={'Total Security'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalQuality}
              subtitle={'Total Quality'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalE1FailedDeploy?.[0]?.failureCount}
              subtitle={'Total E1 Deployments'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalE2FailedDeploy?.[0]?.failureCount}
              subtitle={'Total E2 Deployments'}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col lg={4} md={4} className="mt-3">
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className="p-2"
              score={responseData?.totalE3FailedDeploy?.[0]?.failureCount}
              subtitle={'Total E3 Deployments'}
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    );
  };

  return <div className={"p-3"}>{getBody()}</div>;
}

FailedExecutionsActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default FailedExecutionsActionableInsights;
