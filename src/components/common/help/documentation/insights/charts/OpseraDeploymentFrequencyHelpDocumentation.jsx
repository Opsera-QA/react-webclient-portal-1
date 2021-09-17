import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function OpseraDeploymentFrequencyHelpDocumentation({ closeHelpPanel }) {
  return (
    <HelpDocumentationContainer closeHelpPanel={closeHelpPanel} helpTopic={"Opsera Deployment Frequency"}>
      <p>
        This Opsera Deployment Frequency Stats chart contains 6 metrics
        which measure deployments within a selected date range.
        It includes both successful and failed deployments.
        To change the date range or apply any tags, edit the chart settings.
      </p>
      <div> <b>Successful Deployments</b> - Displays total number of successful deployments within the selected time frame.  When user clicks the data block, a table view displays successful deployment project name and corresponding Run number, status and Timestamp. Upon clicking on a row the user navigates to the corresponding blueprint. </div>
      <div> <b> Failed deployments </b> - Displays total number of failed deployments within the selected time frame. When user clicks the data block, a table view displays failed deployment project name and corresponding Run number, status and Timestamp. Upon clicking on a row the user navigates to the corresponding blueprint.</div>
      <div><b>Success Rate </b>- How rate is calculated: (Successful deployment step/pipelines that have a deployment step).</div>
      <div><b> Average Deployments </b>- Displays the average number of deployments in minutes within the selected time frame.</div>
      <div><b>Max Deployments </b> - Displays the total number of deployments on the date when the maximum number occurred. Hover over the dots to view the date when the most deployments occurred.</div>
      <div> <b> Min Deployments </b>- Displays the total number of deployments on the date when the minimum number occurred. Hover over the dots to view the date when the lowest number of deployments occurred.</div>
    </HelpDocumentationContainer>
  );
}

OpseraDeploymentFrequencyHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(OpseraDeploymentFrequencyHelpDocumentation);
