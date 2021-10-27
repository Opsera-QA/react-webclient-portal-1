import React, { useContext } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import RoleAccessTable from "components/common/fields/access/table/AssignedRoleAccessTable";


function PipelinesHelpDocumentation({pipelineRoleDefinitions}) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <div>Opsera pipelines follow a declarative model. Use the following instructions to manage an existing pipeline or create a new pipeline. To view in depth documentation on pipeline, step configuration and webhook trigger setup view the <a href="https://opsera.atlassian.net/l/c/1H07BWCE" target="_blank" rel="noreferrer"><b>Opsera Pipelines Help Documentation</b>.</a></div>
        <div className={"ml-2"}>
          <div className={"mt-2"}><h5>Manage an existing pipeline:</h5></div>
          <ol>
            <li>Locate the pipeline by using the following sort and filter methods:
              <ul>
                <li>Sort by drop down - Using the drop down, sort pipelines by <b>Date Updated</b>, <b>Date Created</b> or <b>Pipeline Name</b>.</li>
                <li>Sort by Type - In left hand panel, sort pipelines by various type: <b>All Pipelines</b>, <b>My Pipelines</b>, <b>Software Development</b>, <b>Machine Learning</b>, or <b>Salesforce</b>.</li>
                <li>Filter - Using filter icon, filter pipeline by status, tag or owner.</li>
              </ul></li>
            <li>Once the pipeline is located, click on it to view more details and options:
            <ul>
              <li>To run the pipeline, select <b>Start Pipeline</b> button.</li>
              <li>To access logs from past pipeline logs, view Pipeline Logs in Summary tab.</li>
              <li>To edit pipeline details including Type, Tags an RBAC, navigate to Summary tab.</li>
              <li>To edit pipeline configurations, navigate to Workflow.</li>
            </ul></li>
          </ol>
          <div><h5>Create a new pipeline:</h5></div>
            <ol>
              <li>Click on the Catalog tab or <b>+ New Pipeline</b> button to be directed to the Marketplace where you can choose a pipeline template from the publicly available ones provided by Opsera. Navigate to Private if you wish to choose a pipeline template from your organization’s private catalog. </li>
              <li>Once you’ve chosen the template you wish to build a pipeline from, click the <b>Create Pipeline</b> button.</li>
              <li>In the Summary view, provide a unique name and any other required information for the new pipeline including Tags, Type, and any Access Rules. Here you can also access Pipeline Logs from pipeline runs.</li>
              <li>In the Workflow view, configure pipeline steps by clicking on the gear icon within the step. This will take you to the step configuration form.</li>
              <li>To add or delete pipeline steps, select the <b>Edit Workflow</b> button.</li>
            </ol>
          </div>
        </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Pipelines"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}

PipelinesHelpDocumentation.propTypes = {
  pipelineRoleDefinitions: PropTypes.object,
};

export default React.memo(PipelinesHelpDocumentation);