import React, { useState } from "react";
import PropTypes from "prop-types";

import KpiEditorPanel from "./KpiEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import LoadingDialog from "../../../common/status_notifications/loading";
import SummaryTab from "../../../common/tabs/detail_view/SummaryTab";
import SettingsTab from "../../../common/tabs/detail_view/SettingsTab";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";
import KpiSummaryPanel from "./KpiSummaryPanel";

function KpiDetailPanel({ kpiData, setKpiData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  if (kpiData == null) {
    return <LoadingDialog size="sm" />
  }

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab handleTabClick={handleTabClick} activeTab={activeTab} />
        <SettingsTab handleTabClick={handleTabClick} activeTab={activeTab} />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return <KpiSummaryPanel kpiData={kpiData} setActiveTab={setActiveTab}/>;
      case "settings":
        return <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} />;
      default:
        return null;
    }
  };

  return (<DetailTabPanelContainer detailView={getCurrentView()} tabContainer={getTabContainer()} />);
}

KpiDetailPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
};

export default KpiDetailPanel;


