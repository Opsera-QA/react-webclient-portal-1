import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import KpiSummaryPanel from "components/admin/kpi_editor/kpi_detail_view/KpiSummaryPanel";
import KpiEditorPanel from "components/admin/kpi_editor/kpi_detail_view/KpiEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function KpiDetailPanel({ kpiData, setKpiData }) {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const toggleSummaryPanel = () => {
    setActiveTab("summary");
  };

  if (kpiData == null) {
    return (
      <LoadingDialog
        size="sm"
      />
    );
  }

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <SummaryTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "summary":
        return (
          <KpiSummaryPanel
            kpiData={kpiData}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <KpiEditorPanel
            setKpiData={setKpiData}
            kpiData={kpiData}
            handleClose={toggleSummaryPanel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DetailTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

KpiDetailPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
};

export default KpiDetailPanel;


