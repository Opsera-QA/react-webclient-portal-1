import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import GitlabLeadTimeMaturityScoreInsightsMetadata from "./gitlabLeadTimeMaturityScoreInsights.metadata";
import {
    getTableDateTimeColumn,
    getTableDurationTextColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";

import {
    faDraftingCompass,
    faCircleInfo,
    faTimer,
    faLightbulbOn,
    faDatabase,
    faTable
} from "@fortawesome/pro-light-svg-icons";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import VanitySetVerticalTab from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "../../../../../common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import CustomTabContainer from "../../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../../common/tabs/CustomTab";
import TabAndViewContainer from "../../../../../common/tabs/tree/TabTreeAndViewContainer";
import TabPanelContainer from "../../../../../common/panels/general/TabPanelContainer";
import GitlabLeadTimeInsightsDataBlock from "./GitlabLeadTimeInsightsDataBlock";
import {getTimeDisplay} from "../../../charts-helpers";

function GitlabLeadTimeMaturityScoreInsights({ kpiConfiguration, insightsData }) {
    const [activeHorizontalTab, setActiveHorizontalTab] = useState("one");
    const [activeVerticalTab, setActiveVerticalTab] = useState(null);

    const [tableFilterDto, setTableFilterDto] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );

  const noDataMessage = "Maturity score report is currently unavailable";

  const fields = GitlabLeadTimeMaturityScoreInsightsMetadata.fields;
  const maturityScoreByRepositories = insightsData?.maturityScoreByRepositories;
  const maturityScoreByTag = insightsData?.maturityScoreByTag;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "repositoryUrl")),
      getTableTextColumn(getField(fields, "maturityScoreText")),
      getTableDurationTextColumn(getField(fields, "maturityScoreValue")),
    ],
    []
  );

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
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
        if(activeHorizontalTab == "one") {
            return (
                <CustomTable
                    columns={columns}
                    data={maturityScoreByRepositories}
                    noDataMessage={noDataMessage}
                    paginationDto={tableFilterDto}
                    setPaginationDto={setTableFilterDto}
                />
            );
        } else if(activeHorizontalTab == "two") {
            if(activeVerticalTab) {
                data = maturityScoreByTag.filter(tag => tag.name === activeVerticalTab);
            } else {
                data = maturityScoreByTag.filter(tag => tag.name === maturityScoreByTag[0].name);
            }
            return (
                <CustomTable
                    columns={columns}
                    data={data[0].values}
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
        <Col lg={4} md={6} className="mt-3">
            <GitlabLeadTimeInsightsDataBlock
                displayValue={getTimeDisplay(insightsData?.overallMaturityScoreValue)[0]}
                displayText="Average Lead Time"
                icon={faCircleInfo}
            />
        </Col>
        <Col lg={4} md={6} className="mt-3">
            <GitlabLeadTimeInsightsDataBlock
                displayValue={insightsData?.lowLeadTime}
                displayText="Low Lead Time"
                icon={faCircleInfo}
            />
        </Col>
        <Col lg={4} md={6} className="mt-3">
            <GitlabLeadTimeInsightsDataBlock
                displayValue={insightsData?.highLeadTime}
                displayText="High Lead Time"
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
                            activeTab={activeVerticalTab}
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
                    tabText={"Repositories"}
                    handleTabClick={handleHorizontalTabClick}
                    tabName={"one"}
                    icon={faTable}
                />
                <CustomTab
                    activeTab={activeHorizontalTab}
                    tabText={"Tags"}
                    handleTabClick={handleHorizontalTabClick}
                    tabName={"two"}
                    icon={faTable}
                />
            </CustomTabContainer>
        );
    };
    const getTabBody = () => {
        if(activeHorizontalTab == "two") {
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
            return (getTable());
        }
    };
    const getFilterContainer = () => {
    return (
        <>
            <div className={"p-3"}>
                <TabPanelContainer currentView={getTabBody()} tabContainer={getTabNav()} />
            </div>

        </>
    );
  };

  return <>{getBody()}</>;
}

GitlabLeadTimeMaturityScoreInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  insightsData: PropTypes.object,
};

GitlabLeadTimeMaturityScoreInsights.defaultProps = {
};
export default GitlabLeadTimeMaturityScoreInsights;
