import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import RoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";


function PipelinesSummaryHelpDocumentation({pipelineRoleDefinitions}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div className={"ml-2"}>
          <div>The Pipeline Summary provides a general overview of the selected pipeline. Editing capabilities are dependent on user’s Access Rules.</div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Start Pipeline</b> - Trigger a pipeline. For information on the Salesforce Pipeline Wizard, view the <a href="https://docs.opsera.io/salesforce/salesforce-wizard-run" target="_blank" rel="noreferrer"><b>Salesforce Pipeline Wizard Help Documentation</b>.</a></li>
            <li><b>Reset</b> - Reset the current pipeline run state.</li>
            <li><b>Refresh Pipeline Status</b> - Refresh the pipeline status to view the most recent updates.</li>
            <li><b>View Pipeline Configurations</b> - Select the icon to see the Pipeline Configuration Viewer. This shows a read-only view of the entire pipeline, including individual step settings and JSON views.</li>
            <li><b>Publish this pipelines template to your organization’s private catalog</b> - Publish a copy of this pipeline template in your organization’s private catalog for others in your organization to use. Overall settings of the pipeline are shared but no tools or activity logs will be duplicated in this process.</li>
            <li><b>Duplicate this pipeline’s configurations</b> - Create a new pipeline duplicating all of the settings from this one. The pipeline will be available in your list of Pipelines for viewing. No tools or activity logs have been duplicated in this process.</li>
            <li><b>Transfer pipeline to new owner</b> - Select the owner you wish to transfer ownership to from the drop down and click Transfer.</li>
            <li><b>Delete this pipeline</b> - Delete the pipeline. Warning: the pipeline cannot be recovered once it is deleted.</li>
            <li><b>Status</b> - Reflects the success/failure of the last pipeline run.</li>
            <li><b>Type</b> - Pipeline Type selections are Salesforce, Software Development and Machine Learning (AI). To enable <a href="https://docs.opsera.io/api-platform-and-integration/dynamic-settings-and-api#user-interface" target="_blank" rel="noreferrer"><b>Dynamic Settings</b></a>, set the Pipeline's Type to SDLC.</li>
            <li><b>Tags</b> - Used for analytics and data archiving purposes. Applying tags at this level will associate the tag with this pipeline, allowing for more targeted analytics and insights. Note: Tags are not regressive in nature. If a tag is applied after the pipeline has already run multiple times, tag data will ONLY apply to future runs. Prior log data will not be associated with the tag. The same applies if the tag is removed. Data with the tag already associated is not changed in any way.</li>
            <li><b>Schedule</b> - Schedule pipeline to run at a specific time, date and frequency.</li>
          </ul>
          <div>In Pipeline Workflow view, manage pipeline steps and configurations.</div>
          <ul style={{listStyleType: "none"}}>
            <li><b>Start of Workflow</b> - Click the gear icon to configure Source Repository webhook trigger.</li>
            <li><b>View Configuration</b> - View the Pipeline Configuration Viewer. This shows a read-only view of the entire pipeline, including individual step settings and JSON views.</li>
            <li><b>Edit Workflow</b> - Add, copy or delete pipeline steps, or move them up or down in the workflow.</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Pipeline Viewer"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}

PipelinesSummaryHelpDocumentation.propTypes = {
  pipelineRoleDefinitions: PropTypes.object,
};

export default React.memo(PipelinesSummaryHelpDocumentation);