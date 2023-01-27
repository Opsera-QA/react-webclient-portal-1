import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function GenericChartSettingsHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"KPI Settings"}
      closeHelpPanel={closeHelpPanel}
    >
      <div>
      <div className={"mb-1 ml-2"}>Set custom filters and date range for the selected KPI. To apply the settings and view the KPI with the reflected data, click <b>Save</b>. To remove any selected settings, select <b>Clear Value</b> in respective field.</div>
        <ul style={{listStyleType: "none"}}>
          <li><b>Name</b> - Customize KPI display name. </li>
          <li><b>Use KPI Tags</b> - Enable toggle to apply tags to selected KPI.</li>
          <li><b>Use Dashboard Tags</b> - Enable toggle to apply dashboard tags to this KPI. Dashboard tags are applied in Dashboard filter. If Dashboard tags are applied, a report can be found in  <b>Dashboards by Tag</b> in <b>Reports</b>.</li>
          <li><b>Tags</b> - Any associated tags can be applied to the KPI to allow for more targeted analytics.</li>
          <li><b>Date Range</b> - Provide a Start Date and End Date to apply to KPI.</li>
          <li><b>Delete KPI</b> - To remove the KPI from this dashboard, click the <b>Delete KPI</b> button. Once KPI is deleted the data cannot be recovered.</li>
          <li><b>Reset KPI</b> - When new features are added, the internal data may need to be reset in order for changes to be enabled. Data cannot be recovered once this KPI is reset. </li>
          <li><b>Data Point Settings</b> - Provide Strategic Criteria to be triggered upon metric data success, warning and failure.</li>
        </ul>
      </div>
    </HelpDocumentationContainer>
  );
}

GenericChartSettingsHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(GenericChartSettingsHelpDocumentation);