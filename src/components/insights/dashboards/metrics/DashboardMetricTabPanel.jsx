import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import MetricSettingsInputPanel from "components/common/inputs/metric/settings/MetricSettingsInputPanel";
import DashboardMetricDataPointsInputPanel
  from "components/common/inputs/metric/data_points/dashboard/DashboardMetricDataPointsInputPanel";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import ModalTabPanelContainer from "components/common/panels/detail_view/ModalTabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import SettingsTab from "components/common/tabs/detail_view/SettingsTab";
import {faChartNetwork} from "@fortawesome/pro-light-svg-icons";

function DashboardMetricTabPanel(
  {
    metricModel,
    setMetricModel,
    setKpiConfiguration,
    metricEditorPanel,
  }) {
  const [activeTab, setActiveTab] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setActiveTab(activeTab);
  };

  const getDataPointSettingsTab = () => {
    if (metricModel?.getArrayData("dataPoints")?.length > 0) {
      return (
        <CustomTab
          icon={faChartNetwork}
          handleTabClick={handleTabClick}
          activeTab={activeTab}
          tabText={"Data Point Settings"}
          tabName={"data-point-settings"}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer styling={"metric-detail-tabs"}>
        <SettingsTab
          handleTabClick={handleTabClick}
          activeTab={activeTab}
        />
        {getDataPointSettingsTab()}
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
            <DashboardMetricDataPointsInputPanel
              model={metricModel}
              setModel={setMetricModel}
              setKpiConfiguration={setKpiConfiguration}
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
