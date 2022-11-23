import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";

import { faCircleInfo, faTable } from "@fortawesome/pro-light-svg-icons";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import VanitySetVerticalTab from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import TabAndViewContainer from "../../../../../common/tabs/tree/TabTreeAndViewContainer";
import TabPanelContainer from "../../../../../common/panels/general/TabPanelContainer";
import { getMaturityScoreText } from "../../../charts-helpers";
import JiraMeanTimeToResolutionInsightsDataBlock from "./JiraMeanTimeToResolutionInsightsDataBlock";
import JiraMeanTimeToResolutionMaturityScoreInsightsMetadata from "./JiraMeanTimeToResolutionMaturityScoreInsightsMetaData";

function JiraMeanTimeToResolutionMaturityScoreInsights({
  kpiConfiguration,
  insightsData,
}) {
  const [activeHorizontalTab, setActiveHorizontalTab] = useState("one");
  const [activeVerticalTab, setActiveVerticalTab] = useState(null);

  const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false,
    ),
  );

  const noDataMessage = "No Data available";

  const fields = JiraMeanTimeToResolutionMaturityScoreInsightsMetadata.fields;
  const maturityScoreByTag = insightsData?.maturityScoreByTag;
  const maturityScoreByTeam = insightsData?.maturityScoreByTeam;
  const maturityScoreByServiceComponent =
    insightsData?.maturityScoreByServiceComponent;

  const teamNameColumns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "issueTeamName")),
      getTableTextColumn(getField(fields, "totalResolvedIncidents")),
      getTableTextColumn(getField(fields, "maturityScoreText")),
      getTableTextColumn(getField(fields, "maturityScoreValue")),
    ],
    [],
  );

  const tagColumns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "totalResolvedIncidents")),
      getTableTextColumn(getField(fields, "maturityScoreText")),
      getTableTextColumn(getField(fields, "maturityScoreValue")),
    ],
    [],
  );

  const serviceComponentColumns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "issueServiceComponent")),
      getTableTextColumn(getField(fields, "totalResolvedIncidents")),
      getTableTextColumn(getField(fields, "maturityScoreText")),
      getTableTextColumn(getField(fields, "maturityScoreValue")),
    ],
    [],
  );

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return (
      <MetricDateRangeBadge
        startDate={date?.startDate}
        endDate={date?.endDate}
      />
    );
  };

  const getBody = () => {
    return (
      <>
        {getDateRange()}
        {getBuildSummaryDetails()}
        {getFilterContainer()}
      </>
    );
  };
  const getTable = () => {
    let data;
    if (activeHorizontalTab == "one") {
      return (
        <CustomTable
          columns={teamNameColumns}
          data={maturityScoreByTeam}
          noDataMessage={noDataMessage}
          paginationDto={tableFilterDto}
          setPaginationDto={setTableFilterDto}
        />
      );
    } else if (activeHorizontalTab == "two") {
      return (
        <CustomTable
          columns={serviceComponentColumns}
          data={maturityScoreByServiceComponent}
          noDataMessage={noDataMessage}
          paginationDto={tableFilterDto}
          setPaginationDto={setTableFilterDto}
        />
      );
    } else if (activeHorizontalTab == "three") {
      if (activeVerticalTab) {
        data = maturityScoreByTag.filter(
          (tag) => tag.name === activeVerticalTab,
        );
      } else {
        data = maturityScoreByTag.filter(
          (tag) => tag.name === maturityScoreByTag[0].name,
        );
      }
      return (
        <CustomTable
          columns={tagColumns}
          data={data[0]?.values || []}
          noDataMessage={noDataMessage}
          paginationDto={tableFilterDto}
          setPaginationDto={setTableFilterDto}
        />
      );
    }
  };

  const getBuildSummaryDetails = () => {
    if (!insightsData) {
      return null;
    }
    return (
      <Row className="pb-3 px-2">
        <Col
          lg={4}
          md={6}
          className="mt-3"
        >
          <JiraMeanTimeToResolutionInsightsDataBlock
            displayValue={getMaturityScoreText(
              insightsData?.overallMaturityScoreText,
            )}
            displayText="Overall Maturity Score"
            icon={faCircleInfo}
          />
        </Col>
      </Row>
    );
  };

  const handleVerticalTabClick = (tabSelection) => {
    setActiveVerticalTab(tabSelection);
  };

  const handleHorizontalTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    setActiveHorizontalTab(tabSelection);
    setActiveVerticalTab(null);
  };
  const getVerticalTabContainer = () => {
    let tabs = [];
    if (maturityScoreByTag && maturityScoreByTag.length) {
      for (let i = 0; i <= maturityScoreByTag.length - 1; i++) {
        tabs.push(
          <VanitySetVerticalTab
            key={i}
            tabText={maturityScoreByTag[i]?.name}
            tabName={maturityScoreByTag[i]?.name}
            handleTabClick={handleVerticalTabClick}
            activeTab={activeVerticalTab || maturityScoreByTag[0]?.name}
          />,
        );
      }
    }

    return (
      <div>
        <VanitySetVerticalTabContainer
          filterModel={tableFilterDto}
          setFilterModel={setTableFilterDto}
        >
          {tabs}
        </VanitySetVerticalTabContainer>
      </div>
    );
  };

  const getTabNav = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Teams"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"one"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Service Components"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"two"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Tags"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"three"}
          icon={faTable}
        />
      </CustomTabContainer>
    );
  };
  const getTabBody = () => {
    if (activeHorizontalTab == "three") {
      return (
        <TabAndViewContainer
          verticalTabContainer={getVerticalTabContainer()}
          currentView={getTable()}
          bodyClassName="mx-0"
          maximumHeight="calc(100vh - 264px)"
          overflowYContainerStyle={"hidden"}
          overflowYBodyStyle="auto"
        />
      );
    } else {
      return getTable();
    }
  };
  const getFilterContainer = () => {
    return (
      <>
        <div className={"p-3"}>
          <TabPanelContainer
            currentView={getTabBody()}
            tabContainer={getTabNav()}
          />
        </div>
      </>
    );
  };

  return <>{getBody()}</>;
}

JiraMeanTimeToResolutionMaturityScoreInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  insightsData: PropTypes.object,
};

export default JiraMeanTimeToResolutionMaturityScoreInsights;
