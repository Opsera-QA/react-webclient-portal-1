import React from "react";
import PropTypes from "prop-types";
import {INSIGHTS_HELP_DOCUMENTS} from "components/common/help/documentation/insights/insights.help_documents";
import SonarRatingsChartHelpDocumentation
  from "components/common/help/documentation/insights/charts/SonarRatingsV2ChartHelpDocumentation";
import InsightsPipelinesOverviewHelpDocumentation
  from "components/common/help/documentation/insights/synopsis/InsightsPipelinesOverviewHelpDocumentation";
import CoverityIssuesByCategoryHelpDocumentation
  from "components/common/help/documentation/insights/charts/CoverityIssuesByCategoryHelpDocumentation";
import GenericChartSettingsHelpDocumentation
  from "components/common/help/documentation/insights/charts/GenericChartSettingsHelpDocumentation";
import MeanTimeToDeployHelpDocumentation
  from "components/common/help/documentation/insights/charts/MeanTimeToDeployHelpDocumentation";

const HELP_DOCUMENTS = {
...INSIGHTS_HELP_DOCUMENTS,

};

function HelpDocumentationView({ currentView }) {
  const getConfigurationSummaryPanel = () => {
    switch (currentView) {
      case HELP_DOCUMENTS.SONAR_RATINGS:
        return (<SonarRatingsChartHelpDocumentation />);
      case HELP_DOCUMENTS.PIPELINES_OVERVIEW:
        return (<InsightsPipelinesOverviewHelpDocumentation />);
      case HELP_DOCUMENTS.COVERITY_ISSUES_BY_CATEGORY:
        return (<CoverityIssuesByCategoryHelpDocumentation />);
      case HELP_DOCUMENTS.GENERIC_CHART_SETTINGS:
        return (<GenericChartSettingsHelpDocumentation />);
      case HELP_DOCUMENTS.MEAN_TIME_TO_DEPLOY:
        return (<MeanTimeToDeployHelpDocumentation />);
      default:
        return <div className="text-center p-5 text-muted mt-5">Please Select a Help Document</div>;
    }
  };

  return (
    <div className={"p-2"}>
      {getConfigurationSummaryPanel()}
    </div>
  );
}

HelpDocumentationView.propTypes = {
  currentView: PropTypes.string,
};


export default HelpDocumentationView;
