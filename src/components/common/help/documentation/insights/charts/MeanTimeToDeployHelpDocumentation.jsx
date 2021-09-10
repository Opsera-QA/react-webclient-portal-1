import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function MeanTimeToDeployHelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Mean Time to Deploy"}>
      <div>
        The purpose of this KPI is to show the mean time taken to deploy within a given time frame (Day/Week/Month/Year).
        Each Bar represents the average time it took for deployments on a given date (measured in minutes) and is labelled with the number of
        successful deployments on that day for extra information. There is also a line running through the bar chart
        representing the average mean time to deploy. The value of the mean line is present in the legend. Upon clicking an individual bar you can see insights about the
        pipeline and run count for each successful deployment, linked to the respective blueprint for further insights.
        The goal is to have as low as possible mean time to deploy.
      </div>
      <div> *The number of pipelines in insights may not match the total number
        of successful deployments mentioned on the bar if there are pipelines that have two deployment steps.* </div>
    </HelpDocumentationContainer>
  );
}

MeanTimeToDeployHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(MeanTimeToDeployHelpDocumentation);