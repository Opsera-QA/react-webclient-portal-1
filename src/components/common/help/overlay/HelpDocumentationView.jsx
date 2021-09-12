import React from "react";
import PropTypes from "prop-types";
import {INSIGHTS_HELP_DOCUMENTS} from "components/common/help/documentation/insights/insights.help_documents";
import SonarRatingsChartHelpDocumentation
  from "components/common/help/documentation/insights/charts/SonarRatingsChartHelpDocumentation";

const HELP_DOCUMENTS = {
...INSIGHTS_HELP_DOCUMENTS,

};

function HelpDocumentationView({ currentView }) {
  const getConfigurationSummaryPanel = () => {
    switch (currentView) {
      case HELP_DOCUMENTS.SONAR_RATINGS:
        return (<SonarRatingsChartHelpDocumentation />);
      default:
        return <div className="text-center p-5 text-muted mt-5">Summary Panel is not currently available for this tool configuration.</div>;
    }
  };
  
  return (getConfigurationSummaryPanel());
}

HelpDocumentationView.propTypes = {
  currentView: PropTypes.string,
};


export default HelpDocumentationView;
