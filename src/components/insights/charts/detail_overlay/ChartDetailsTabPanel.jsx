import React, { useState } from "react";
import PropTypes from "prop-types";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import JsonTab from "components/common/tabs/detail_view/JsonTab";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";
import ChartSummaryPanelWrapper from "components/insights/charts/detail_overlay/ChartSummaryPanelWrapper";
import ChartJsonPanel from "components/insights/charts/detail_overlay/ChartJsonPanel";

function ChartDetailsTabPanel({ chartModel }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getActionSpecificTab = () => {
    // TODO: Make switch statement if a handful are added
    // if (chartModel.action === "console output") {
    //   return (<ConsoleLogTab activeTab={activeTab} handleTabClick={handleTabClick} />);
    // }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        {/*{getActionSpecificTab()}*/}
        <JsonTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <ChartSummaryPanelWrapper chartModel={chartModel} />;
      case "json":
        return <ChartJsonPanel chartModel={chartModel.getPersistData()} />;
      default:
        return null;
    }
  };

  return (<ModalTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

ChartDetailsTabPanel.propTypes = {
  chartModel: PropTypes.object,
};

export default ChartDetailsTabPanel;


