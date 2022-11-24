import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";

import { faCircleInfo, faTable, faPeople, faTags, faFolderGear } from "@fortawesome/pro-light-svg-icons";
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
import FilterContainer from "../../../../../common/table/FilterContainer";

function JiraMeanTimeToResolutionMaturityScoreInsights({
  kpiConfiguration,
  insightsData,
}) {
  const [activeHorizontalTab, setActiveHorizontalTab] = useState("projects");
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
  const maturityScoreByProject = insightsData?.maturityScoreByProject;
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

  const projectColumns = useMemo(
      () => [
        getTableTextColumn(getField(fields, "issueProjectName")),
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
    if (activeHorizontalTab == "projects") {
      return (
        <FilterContainer
          title={"Maturity Score by Projects"}
          body={getTableContainer(projectColumns, maturityScoreByProject)}
          className={"px-2 pb-2"}
        />
      );
    } else if (activeHorizontalTab == "teams") {
      return (
        <FilterContainer
          title={"Maturity Score by Teams"}
          body={getTableContainer(teamNameColumns, maturityScoreByTeam)}
          className={"px-2 pb-2"}
        />
      );
    } else if (activeHorizontalTab == "serviceCompoents") {
      return (
        <FilterContainer
          title={"Maturity Score by Service Components"}
          body={getTableContainer(serviceComponentColumns, maturityScoreByServiceComponent)}
          className={"px-2 pb-2"}
        />
      );
    } else if (activeHorizontalTab == "tags") {
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
        <FilterContainer
          title={"Maturity Score by Tags"}
          body={getTableContainer(tagColumns, data[0]?.values || [])}
          className={"px-2 pb-2"}
        />
      );
    }
  };

  const getTableContainer = (columns, data) => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={tableFilterDto}
        setPaginationDto={setTableFilterDto}
      />
    );
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
      <CustomTabContainer styling={"metric-detail-tabs"}>
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Projects"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"projects"}
          icon={faTable}
        />
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Teams"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"teams"}
          icon={faPeople}
        />
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Service Components"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"serviceComponents"}
          icon={faFolderGear}
        />
        <CustomTab
          activeTab={activeHorizontalTab}
          tabText={"Tags"}
          handleTabClick={handleHorizontalTabClick}
          tabName={"tags"}
          icon={faTags}
        />
      </CustomTabContainer>
    );
  };
  const getTabBody = () => {
    if (activeHorizontalTab == "tags") {
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
