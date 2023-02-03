import React from "react";
import PropTypes from "prop-types";
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
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";
import modelHelpers from "components/common/model/modelHelpers";

function AnalyticsDataEntrySummary({ analyticsDataEntry, setActiveTab }) {
  const getAnalyticsDataEntrySummary = () => {
    switch (analyticsDataEntry?.getData("kpi_identifier")) {
      case kpiIdentifierConstants.KPI_IDENTIFIERS.ADOPTION_PERCENTAGE:
        return (
          <AdoptionPercentageDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            adoptionPercentageData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), adoptionPercentageMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.QA_MANUAL_TEST:
        return (
          <QaManualTestDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            qaManualTestData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), qaManualTestMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.FIRST_PASS_YIELD:
        return (
          <FirstPassYieldDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            firstPassYieldData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), firstPassYieldMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.CUMULATIVE_OPEN_DEFECTS:
        return (
          <CumulativeOpenDefectsDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            cumulativeOpenDefectsData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), cumulativeOpenDefectsMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.AUTOMATION_PERCENTAGE:
        return (
          <AutomationPercentageDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            automationPercentageData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), automationPercentageMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.AUTOMATED_TEST_RESULTS:
        return (
          <AutomatedTestResultsDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            automatedTestResultsData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), automatedTestResultsConfigMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.DEFECT_REMOVAL_EFFICIENCY:
        return (
          <DefectRemovalEfficiencyDataEntrySummaryPanel
            analyticsDataEntry={analyticsDataEntry}
            defectRemovalEfficiencyData={modelHelpers.parseObjectIntoModel(analyticsDataEntry?.getData("data"), defectRemovalEfficiencyMetadata)}
            setActiveTab={setActiveTab}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={"h-100"}>
      {getAnalyticsDataEntrySummary()}
    </div>
  );
}

AnalyticsDataEntrySummary.propTypes = {
  analyticsDataEntry: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default AnalyticsDataEntrySummary;
