import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import MetricSettingsInputPanel from "components/common/inputs/metric/settings/MetricSettingsInputPanel";
import UserEditableMetricDataPointsInputPanel
  from "components/common/inputs/metric/data_points/UserEditableMetricDataPointsInputPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";

function DashboardMetricTabPanel(
  {
    metricModel,
    setMetricModel,
    metricEditorPanel,
  }) {
  const [activeTab, setActiveTab] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling={"metric-detail-tabs"}>
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        <CustomTab
          icon={faChartNetwork}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Data Point Settings"}
          tabName={"data-point-settings"}
        />
      </CustomTabContainer>
    );
  };

  const getCurrentView = () => {
    switch (activeTab) {
      case "settings":
        return (
          <div className={"mx-3"}>
            <TextInputBase
              fieldName={"kpi_name"}
              dataObject={metricModel}
              setDataObject={setMetricModel}
            />
            <MetricSettingsInputPanel
              metricModel={metricModel}
              setMetricModel={setMetricModel}
              metricSettings={metricModel?.getData("settings")}
            />
            {metricEditorPanel}
          </div>
        );
      case "data-point-settings":
        return (
          <div>
            <UserEditableMetricDataPointsInputPanel
              model={metricModel}
              setModel={setMetricModel}
            />
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <ModalTabPanelContainer
      detailView={getCurrentView()}
      tabContainer={getTabContainer()}
    />
  );
}

DashboardMetricTabPanel.propTypes = {
  metricModel: PropTypes.object,
  setMetricModel: PropTypes.func,
  metricEditorPanel: PropTypes.object,
  closePanel: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadData: PropTypes.func,
  settingsHelpComponent: PropTypes.object,
};

export default DashboardMetricTabPanel;
