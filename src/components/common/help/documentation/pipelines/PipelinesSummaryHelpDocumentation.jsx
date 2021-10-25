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
        <div className={"ml-2 mb-2"}>
          <div><h5>Pipeline Summary</h5>A general overview of the selected pipeline including the name, ID, Owner, Organization, Type, Tags, Access Rules, Notes, Summary, Pipeline Run Count, Created date, Org Account, and schedule. Editing capabilities are dependent on user’s Access Rules. Edit the values containing a pencil icon.</div>
            <div className={"ml-3 mt-2"}>
              <div className={"mb-1"}><b>Name</b> - Enter a unique name for your pipeline.</div>
              <div className={"mb-1"}><b>Type</b> - Select the pipeline type from the drop down. The choices are Salesforce, Software Development and Machine Learning (AI).</div>
              <div className={"mb-1"}><b>Schedule</b> - Manage pipeline’s scheduled tasks.</div>
              <div className={"mb-1"}><b>Tags</b> - Used for analytics and data archiving purposes. Applying tags at this level will associate the tag with this pipeline, allowing for more targeted analytics and insights. Note: Tags are not regressive in nature. If a tag is applied after the pipeline has already run multiple times, tag data will ONLY apply to future runs. Prior log data will not be associated with the tag. The same applies if the tag is removed. Data with the tag already associated is not changed in any way.</div>
              <div className={"mb-1"}><b>Access Rules</b> - User actions are determined by set access rules. View the Role Access chart to determine access rules.</div>
              <div className={"mb-1"}><b>Notes</b> - Add any important notes associated with your pipeline.</div>
              <div className={"mb-1"}><b>Start Pipeline</b> - Trigger a new pipeline run. For detailed information on the Salesforce Pipeline Wizard, view the <a href="https://opsera.atlassian.net/l/c/0at4FnKu" target="_blank" rel="noreferrer"><b>Salesforce Pipeline Wizard Help Documentation</b>.</a>.</div>
              <div className={"mb-1"}><b>Reset</b> - Reset the current pipeline run state.</div>
              <div className={"mb-1"}><b>Refresh Pipeline Status</b> - Refresh the pipeline status to view the most recent updates.</div>
              <div className={"mb-1"}><b>View Pipeline Configurations</b> - Select the icon to see the Pipeline Configuration Viewer. This shows a read-only view of the entire pipeline, including individual step settings and JSON views.</div>
              <div className={"mb-1"}><b>Publish this pipelines template to your organization’s private catalog</b> - Publish a copy of this pipeline template in your organization’s private catalog for others in your organization to use. Overall settings of the pipeline are shared but no tools or activity logs will be duplicated in this process.</div>
              <div className={"mb-1"}><b>Duplicate this pipeline’s configurations</b> - Create a new pipeline duplicating all of the settings from this one. The pipeline will be available in your list of Pipelines for viewing. No tools or activity logs have been duplicated in this process.</div>
              <div className={"mb-1"}><b>Transfer pipeline to new owner</b> - Select the owner you wish to transfer ownership to from the drop down and click Transfer.</div>
              <div className={"mb-1"}><b>Delete this pipeline</b> - Delete the pipeline. Warning: the pipeline cannot be recovered once it is deleted. </div>
              <div className={"mb-1"}><b>Pipeline Logs</b> - View pipeline logs by run in a table including Run number, Step, Action, Message, Status and Date. Includes the ability to sort by status and export as a PDF. To view in depth information on a specific step, click on the step in the table to view the Pipeline Task Details. This will include a Summary, JSON view an existing Console Logs.</div>
            </div>
          <div className={"mt-2"}><h5>Pipeline Workflow</h5>Manage the pipeline Workflow including pipeline steps and configurations.</div>
            <div className={"ml-3 mt-1"}>
              <div className={"mb-1"}><b>Start of Workflow</b> - Click the gear icon to configure Source Repository webhook trigger. </div>
              <div className={"mb-1"}><b>View Configuration</b> - View the Pipeline Configuration Viewer. This shows a read-only view of the entire pipeline, including individual step settings and JSON views.</div>
              <div className={"mb-1"}><b>Edit Workflow</b> - Add, copy or delete pipeline steps, or move them up or down in the workflow.</div>
            </div>
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