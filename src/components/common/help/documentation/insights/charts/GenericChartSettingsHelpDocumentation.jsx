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
      <div className={"mb-1 ml-2"}>Change KPI display name and set filters and date range for the selected KPI. To apply the settings and view the KPI with the reflected data, click the <b>Save</b> button. To remove any selected settings, select <b>Clear Value</b> in respective field.</div>
        <ul style={{listStyleType: "none"}}>
          <li><b>Delete KPI</b> - To remove the KPI from this dashboard, click the <b>Delete KPI</b> button. Data cannot be recovered once this KPI is deleted.</li>
          <li><b>Reset KPI</b> - Reset the KPI name and/or internal properties. When new features are added, sometimes the internal data needs to be reset to enable those features. Data cannot be recovered once this KPI is reset. </li>
          <li><b>KPI Tags</b> - Enable toggle to apply tags to selected KPI.</li>
          <li><b>Dashboard Tags</b> - Enable toggle to apply dashboard tags to this KPI. Dashboard tags are applied in Dashboard Settings.</li>
        </ul>
      </div>
    </HelpDocumentationContainer>
  );
}

GenericChartSettingsHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(GenericChartSettingsHelpDocumentation);