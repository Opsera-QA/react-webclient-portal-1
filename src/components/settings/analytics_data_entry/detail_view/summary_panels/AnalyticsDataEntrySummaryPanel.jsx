import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import AdoptionPercentageDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/adoption_percentage/AdoptionPercentageDataEntrySummaryPanel";
import adoptionPercentageMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/adoption_percentage/adoption-percentage-metadata";
import QaManualTestDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/qa_manual_test/QaManualTestDataEntrySummaryPanel";
import qaManualTestMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/qa_manual_test/qa-manual-test-configuration-metadata";
import FirstPassYieldDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/first_pass_yield/FirstPassYieldDataEntrySummaryPanel";
import firstPassYieldMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/first_pass_yield/first-pass-yield-metadata";
import CumulativeOpenDefectsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/cumulative_open_defects/CumulativeOpenDefectsDataEntrySummaryPanel";
import cumulativeOpenDefectsMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/cumulative_open_defects/cumulative-open-defects-metadata";
import AutomationPercentageDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/automation_percentage/AutomationPercentageDataEntrySummaryPanel";
import automationPercentageMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/automation_percentage/automation-percentage-metadata";
import AutomatedTestResultsDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/automated_test_results/AutomatedTestResultsDataEntrySummaryPanel";
import automatedTestResultsConfigMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/automated_test_results/automated-test-results-config-metadata";
import DefectRemovalEfficiencyDataEntrySummaryPanel from "components/settings/analytics_data_entry/detail_view/summary_panels/defect_removal_efficiency/DefectRemovalEfficiencyDataEntrySummaryPanel";
import defectRemovalEfficiencyMetadata from "components/settings/analytics_data_entry/detail_view/configuration_panels/defect_removal_efficiency/defect-removal-efficiency-configuration-metadata";

function AnalyticsDataEntrySummary({ analyticsDataEntry, setActiveTab }) {
  const getModelWrappedObject = (metaData) => {
    return new Model({ ...analyticsDataEntry?.data?.data }, metaData, false);
  };

  const getAnalyticsDataEntrySummary = () => {
    switch (analyticsDataEntry.getData("kpi_identifier")) {
      case "adoption-percentage":
        return (
          <AdoptionPercentageDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            adoptionPercentageData={getModelWrappedObject(adoptionPercentageMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case "qa-manual-test":
        return (
          <QaManualTestDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            qaManualTestData={getModelWrappedObject(qaManualTestMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case "first-pass-yield":
        return (
          <FirstPassYieldDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            firstPassYieldData={getModelWrappedObject(firstPassYieldMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case "cumulative-open-defects":
        return (
          <CumulativeOpenDefectsDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            cumulativeOpenDefectsData={getModelWrappedObject(cumulativeOpenDefectsMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case "automation-percentage":
        return (
          <AutomationPercentageDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            automationPercentageData={getModelWrappedObject(automationPercentageMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case "automated-test-results":
        return (
          <AutomatedTestResultsDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            automatedTestResultsData={getModelWrappedObject(automatedTestResultsConfigMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case "defect-removal-efficiency":
        return (
          <DefectRemovalEfficiencyDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            defectRemovalEfficiencyData={getModelWrappedObject(defectRemovalEfficiencyMetadata)}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return <div className={"step-configuration-summary h-100"}>{getAnalyticsDataEntrySummary()}</div>;
}

AnalyticsDataEntrySummary.propTypes = {
  analyticsDataEntry: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default AnalyticsDataEntrySummary;
