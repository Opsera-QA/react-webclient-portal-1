import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function DashboardFiltersHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Edit Filters"}
    >
      <div>
        <div className={"mb-2"}>Any tags applied to Filter will display only the associated metrics. </div>
        <div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Organizations</b> - Any Tags that have been mapped to an Organization in <b>Settings</b> &gt; <b>Analytics Data Mapping</b> will be applied to dashboard upon selection.</li>
            <li><b>Tags</b> - If a Tag is applied to dashboard filter, it can be used to pull a <b>Dashboard by Tags</b> report (<b>Reports</b>). </li>
          </ul>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

DashboardFiltersHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(DashboardFiltersHelpDocumentation);