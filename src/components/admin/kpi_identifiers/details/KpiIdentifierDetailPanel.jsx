import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import SummaryTab from "components/common/tabs/detail_view/SummaryTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import KpiIdentifierSummaryPanel from "components/admin/kpi_identifiers/details/KpiIdentifierSummaryPanel";
import KpiIdentifierEditorPanel from "components/admin/kpi_identifiers/details/KpiIdentifierEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";

function KpiIdentifierDetailPanel({ kpiData, setKpiData }) {
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
          <KpiIdentifierSummaryPanel
            kpiData={kpiData}
            setActiveTab={setActiveTab}
          />
        );
      case "settings":
        return (
          <KpiIdentifierEditorPanel
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

KpiIdentifierDetailPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
};

export default KpiIdentifierDetailPanel;


