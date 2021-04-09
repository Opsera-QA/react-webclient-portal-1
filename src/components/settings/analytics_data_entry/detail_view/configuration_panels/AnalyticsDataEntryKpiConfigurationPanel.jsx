import React from "react";
import PropTypes from "prop-types";
import AnalyticsDataEntryKpiIdentifierSelectInput
  from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryKpiIdentifierSelectInput";
import TempKpiConfigurationPanel
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/temp/TempKpiConfigurationPanel";

function AnalyticsDataEntryKpiConfigurationPanel({ analyticsDataEntryModel, setAnalyticsDataEntryModel, kpiConfigurationData, setKpiConfigurationData }) {
  const getConfigurationPanel = () => {
    // TODO: Divyesha, the switch case needs to be changed to match the identifier of your KPI
    switch (analyticsDataEntryModel.getData("kpi_identifier")) {
      case "qa-manual-test":
        return (
          <TempKpiConfigurationPanel
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case "":
        return <div className="text-center text-muted p-5">You must select a  before configuring notification type details.</div>;
      default:
        return <div className="text-center text-muted p-5">Configuration is not currently available for this KPI.</div>;
    }
  };

  return (
    <div>
      <div className={"mx-3"}>
        <AnalyticsDataEntryKpiIdentifierSelectInput
          analyticsDataEntryModel={analyticsDataEntryModel}
          setAnalyticsDataEntryModel={setAnalyticsDataEntryModel}
          setKpiConfigurationModel={setKpiConfigurationData}
        />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

AnalyticsDataEntryKpiConfigurationPanel.propTypes = {
  notificationType: PropTypes.string,
  analyticsDataEntryModel: PropTypes.object,
  kpiConfigurationData: PropTypes.object,
  setKpiConfigurationData: PropTypes.func,
  setAnalyticsDataEntryModel: PropTypes.func
};

export default AnalyticsDataEntryKpiConfigurationPanel;
