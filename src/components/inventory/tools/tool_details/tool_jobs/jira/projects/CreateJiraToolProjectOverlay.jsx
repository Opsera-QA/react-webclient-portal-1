import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import JiraToolProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraToolProjectEditorPanel";
import Model from "core/data_model/model";
import {jiraProjectMetadata} from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jiraProject.metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateJiraToolProjectOverlay({ toolData, loadData } ) {
  const toastContext = useContext(DialogToastContext);
  const [jiraProjectData, setJiraProjectData] = useState(undefined);

  useEffect(() => {
    setJiraProjectData(new Model({...jiraProjectMetadata.newObjectFields}, jiraProjectMetadata, true));
  }, []);

  const closePanel = () => {
    loadData();
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (jiraProjectData == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      handleCancelModal={closePanel}
      objectType={"Jira Project"}
      loadData={loadData}
    >
      <JiraToolProjectEditorPanel
        toolData={toolData}
        jiraProjectData={jiraProjectData}
        setJiraProjectData={setJiraProjectData}
        handleClose={closePanel}
      />
    </CreateCenterPanel>
  );
}

CreateJiraToolProjectOverlay.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
};

export default CreateJiraToolProjectOverlay;


