import React from "react";
import PropTypes from "prop-types";
import AnalyticsDataEntryKpiIdentifierSelectInput
  from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryKpiIdentifierSelectInput";
import QaManualTestConfigurationPanel
  from "components/settings/analytics_data_entry/detail_view/configuration_panels/qa_manual_test/QaManualTestConfigurationPanel";
import FirstPassYieldConfiguration from "./first_pass_yield/FirstPassYieldConfiguration";
import CumulativeOpenDefectsConfiguration from "./cumulative_open_defects/CumulativeOpenDefectsConfiguration";
import AutomationPercentageConfiguration from "./automation_percentage/AutomationPercentageConfiguration";
import AdoptionPercentageConfiguration from "./adoption_percentage/AdoptionPercentageConfiguration";
import AutomatedTestResultsConfigPanel from "./automated_test_results/AutomatedTestResultsConfigPanel";
import DefectRemovalEfficiencyConfigurationPanel from "./defect_removal_efficiency/DefectRemovalEfficiencyConfigurationPanel";
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";

function AnalyticsDataEntryKpiConfigurationPanel({ analyticsDataEntryModel, setAnalyticsDataEntryModel, kpiConfigurationData, setKpiConfigurationData }) {
  const getConfigurationPanel = () => {
    switch (analyticsDataEntryModel?.getData("kpi_identifier")) {
      case kpiIdentifierConstants.KPI_IDENTIFIERS.QA_MANUAL_TEST:
        return (
          <QaManualTestConfigurationPanel
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.FIRST_PASS_YIELD:
        return (
          <FirstPassYieldConfiguration
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.CUMULATIVE_OPEN_DEFECTS:
        return (
          <CumulativeOpenDefectsConfiguration
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.AUTOMATION_PERCENTAGE:
        return (
          <AutomationPercentageConfiguration
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.ADOPTION_PERCENTAGE:
        return (
          <AdoptionPercentageConfiguration
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.AUTOMATED_TEST_RESULTS:
        return (
          <AutomatedTestResultsConfigPanel
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.DEFECT_REMOVAL_EFFICIENCY:
        return (
          <DefectRemovalEfficiencyConfigurationPanel 
            analyticsDataEntryModel={analyticsDataEntryModel}
            setKpiConfigurationData={setKpiConfigurationData}
            kpiConfigurationData={kpiConfigurationData}
          />
        );
      case "":
        return <div className="text-center text-muted p-5">You must select a KPI before configuring notification type details.</div>;
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
