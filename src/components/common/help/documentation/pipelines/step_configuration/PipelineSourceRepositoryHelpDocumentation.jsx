import React from "react";
import PropType from "prop-types";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";

function PipelineSourceRepositoryHelpDocumentation({ closeHelpPanel }) {
  const getHelpDocumentation = () => {
      return (
        <div>
          <h6>Repository</h6>
          <div>Configure the repository settings below then enable the additional Git functionality required. For Git functionality to take effect, configurations must be saved. </div>
            <ul style={{listStyleType: "none"}}>
              <li><b>Platform</b> - Select the source code management platform containing the project where your webhook will be enabled or where the current version of the pipeline will be published (if enabling <b>Pipeline Git Revisions</b>). Choose from GitLab, GitHub, Bitbucket or Azure Devops.</li>
              <li><b>Source Code Management Tool</b> - Select the tool containing the project you wish to configure. </li>
              <li><b>Repository</b> -  Once an account is selected, a list of its repositories will be fetched. Select the particular Repository of your project.</li>
              <li><b>Primary Branch</b> - The pipeline will be bound to the selected branch.</li>
              <li><b>Secondary Branch</b> - Optionally, select a second branch. The pipeline will also be bound to this branch if selected.</li>
            </ul>
            <h6>Webhook</h6>
            <div>Opsera Pipelines support webhook based start events for projects in GitLab, GitHub, Bitbucket and Azure Devops. To register webhook automatically, configure repository and choose events then click <b>Register Webhook</b>. For more information view the <b><a href="https://docs.opsera.io/webhook-integration/how-to-configure-a-pipeline-for-multiple-webhook-events" target="_blank" rel="noreferrer">Configure Single Pipeline for Multiple Webhook Events Help</a>.</b>
              <ul style={{listStyleType: "none"}}>
                <li><b>Push Events</b> - Enable to trigger this pipeline for push events only.</li>
                <li><b>PR Events</b> - Enable to trigger this pipeline for pull request events.</li>
                <li><b>PR Created</b> - Enable to trigger only when pull request is created.</li>
                <li><b>PR Approved</b> - Enable to trigger only when pull request is approved.</li>
                <li><b>Pipeline Queuing</b> - Opsera Pipelines support queuing of runs when the pipeline is currently in progress. If a pipeline is already running and another webhook request comes in, the webhook request will be logged in the Pipeline Logs as part of the NEXT run as a Queued Request. Once the current run is successful, the queued pipeline will run.  The latest commit will always be used and the pipeline will only run once after the current run no matter how many run requests it gets for that time period. If prior pipeline fails the queued request will not run.</li>
            </ul>
            </div>
          <h6>Pipeline Git Revisions</h6>
          <div>Using the configured Git Repository, Opsera can publish a copy of the pipeline configuration for revision purposes when export to git is pressed. This feature is only available for GitHub and GitLab repositories.
              . For more information view the <b><a href="https://docs.opsera.io/create-and-manage-pipelines/export-pipeline-to-github-gitlab-on-demand" target="_blank" rel="noreferrer">Export Pipeline to Github/GitLab on Demand Help</a>.</b></div>
            <ul style={{listStyleType: "none"}}>
              <li><b>Path</b> - Provide the path folder where version of pipeline will be published.</li>
            </ul>
            <h6>Dynamic Settings</h6>
            <div> Dynamic Settings allow the user running a pipeline to change supported values in the pipeline at runtime. When this is enabled, a user will get a prompt to change the Git Branch for this pipeline before it starts, allowing them to target different branches without having to edit the pipeline. Configure the Pipeline&apos;s Type to Software Development (SDLC) to enable this feature. For more information view the <b><a href="https://docs.opsera.io/api-platform-and-integration/dynamic-settings-and-api#user-interface" target="_blank" rel="noreferrer">Configure Dynamic Settings for Pipeline Help</a>.</b></div>
            <ul style={{listStyleType: "none"}}>
              <li><b>Show Advanced Start Options Screen</b> - Enable to set pipeline Dynamic Settings in the UI at runtime.</li>
            </ul>
        </div>
      );
  };

  if (closeHelpPanel == null) {
    return null;
  }

  return (
    <HelpDocumentationContainer
      closeHelpPanel={closeHelpPanel}
      helpTopic={"Pipeline Settings"}
    >
      {getHelpDocumentation()}
    </HelpDocumentationContainer>
  );
}

PipelineSourceRepositoryHelpDocumentation.propTypes = {
  closeHelpPanel: PropType.func,
};

export default React.memo(PipelineSourceRepositoryHelpDocumentation);