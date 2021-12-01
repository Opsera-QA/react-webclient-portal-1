import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import KpiIdentifierSummaryPanel from "components/admin/kpi_identifiers/details/KpiIdentifierSummaryPanel";
import KpiIdentifierEditorPanel from "components/admin/kpi_identifiers/details/KpiIdentifierEditorPanel";
import DetailTabPanelContainer from "components/common/panels/detail_view/DetailTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faBezierCurve} from "@fortawesome/pro-light-svg-icons";
import SummaryToggleTab from "components/common/tabs/detail_view/SummaryToggleTab";
import KpiDataPointsPanel from "components/admin/kpi_identifiers/details/data_points/KpiDataPointsPanel";

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
        <SummaryToggleTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <CustomTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          icon={faBezierCurve}
          tabName={"dataPoints"}
          tabText={"Data Points"}
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
      case "dataPoints":
        return (
          <KpiDataPointsPanel
            kpiId={kpiData?.getData("_id")}
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


