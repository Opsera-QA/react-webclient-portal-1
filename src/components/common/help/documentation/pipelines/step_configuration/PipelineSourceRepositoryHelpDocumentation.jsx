import React, { useContext } from "react";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineSourceRepositoryHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
      return (
        <div>
          <div className={"ml-2 mb-3"}>Opsera Pipelines support webhook based start events for projects in GitLab, GitHub and Bitbucket. Select a primary branch the trigger will occur off of, with the option to select an additional secondary branch. Use the following instructions to configure a webhook trigger event for this pipeline. For more detailed information on webhook trigger configurations, view the <b><a href="https://opsera.atlassian.net/l/c/uGkMZ0ZF" target="_blank" rel="noreferrer">Configure Single Pipeline for Multiple Webhook Events Help Documentation</a></b>
          </div>
          <div className={"ml-4"}>
            <h6>Source Repository Configuration and Webhook Registration</h6>
            <ol>
              <li>Restrict a webhook trigger to a particular project and branch (or 2 branches) by making the following selections from the drop downs:
                <ul style={{listStyleType: "none"}}>
                  <li><b>Platform</b> - Select the SCM (source control management) platform containing the project where your webhook will be enabled. Choose from Bitbucket, Github or Gitlab.</li>
                  <li><b>Account</b> - Once a platform is selected, corresponding accounts stored in the Tool Registry are fetched. Select the account containing the project you wish to configure your webhook trigger events to. </li>
                  <li><b>Repository</b> -  Once an account is selected, a list of its repositories will be fetched. Select the particular Repository of your project.</li>
                  <li><b>Primary Branch</b> - Select the branch to add the webhook event trigger to. The pipeline will be bound to the selected branch activity.</li>
                  <li><b>Secondary Branch</b> - Optionally, select a second branch to add the webhook event trigger to. The pipeline will also be bound to this branch if selected.</li>
                </ul>
              </li>
              <li>Register a webhook by enabling the ‘Trigger Active’ toggle.
                <ul style={{listStyleType: "none"}}>
                  <li><b>Manual registration</b> - Manually complete webhook registration by copying the webhook URL shown. In your SCM repository webhook settings, paste the copied webhook URL.</li>
                </ul>
              </li>
              <li>Select <b>Save</b>. Upon save, this pipeline will run anytime a commit occurs in the selected branch(es). Any activity in other branches for this account will be ignored.</li>
            </ol>
            <h6>Pipeline Queuing</h6>
            <div className={"ml-4"}>Opsera Pipelines support queuing of runs when the pipeline is currently in progress. If a pipeline is already running and another webhook request comes in, the webhook request will be logged in the Pipeline Logs as part of the NEXT run as a Queued Request. Once the current run is successful, the queued pipeline will run a second time.  The latest commit will always be used and the pipeline will only run once after the current run no matter how many run requests it gets for that time period. If prior pipeline fails the queued request will not run.</div>
          </div>
        </div>
      );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Source Repository"}
    />
  );
}

export default React.memo(PipelineSourceRepositoryHelpDocumentation);