import React, { useState } from "react";
import PropTypes from "prop-types";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";
import ChartSummaryPanelWrapper from "components/insights/charts/detail_overlay/ChartSummaryPanelWrapper";
import ChartJsonPanel from "components/insights/charts/detail_overlay/ChartJsonPanel";

function ChartDetailsTabPanel({ dashboardData, kpiConfiguration, chartModel, kpiIdentifier, pipelineName, currentDate }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  // TODO: Wire up settings view
  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ChartSummaryPanelWrapper dashboardData={dashboardData} kpiConfiguration={kpiConfiguration} chartModel={chartModel} kpiIdentifier={kpiIdentifier} pipelineName={pipelineName} currentDate={currentDate}/>;
      case "json":
        return <ChartJsonPanel chartModel={chartModel.getPersistData()} />;
      // case "settings":
      //   return <KpiSettingsForm chartModel={chartModel.getPersistData()} />;
      default:
        return null;
    }
  };

  return (<ModalTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ChartDetailsTabPanel.propTypes = {
  chartModel: PropTypes.object,
  kpiIdentifier: PropTypes.string,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  pipelineName: PropTypes.string,
  currentDate: PropTypes.string
};

export default ChartDetailsTabPanel;


