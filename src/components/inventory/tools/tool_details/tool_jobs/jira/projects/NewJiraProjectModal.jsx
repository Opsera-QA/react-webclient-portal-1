import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import CreateModal from "components/common/modal/CreateModal";
import JiraProjectEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jira/projects/details/JiraProjectEditorPanel";
import Model from "core/data_model/model";
import jiraProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jira-project-metadata";

function NewJiraProjectModal({ toolData, loadData, setShowModal, showModal } ) {
  const [jiraProjectData, setJiraProjectData] = useState(undefined);

  useEffect(() => {
    setJiraProjectData(new Model({...jiraProjectMetadata.newObjectFields}, jiraProjectMetadata, true));
  }, [showModal]);

  const handleClose = () => {
    loadData();
    setShowModal(false);
  };

  return (
    <CreateModal handleCancelModal={handleClose} objectType={"Jira Project"} showModal={showModal} loadData={loadData} >
      <JiraProjectEditorPanel toolData={toolData} jiraProjectData={jiraProjectData} setJiraProjectData={setJiraProjectData} loadData={loadData} jobData={{}} handleClose={handleClose} />
    </CreateModal>
  );
}

NewJiraProjectModal.propTypes = {
  toolData: PropTypes.object,
  showModal: PropTypes.bool,
  loadData: PropTypes.func,
  setShowModal: PropTypes.func,
};

export default NewJiraProjectModal;


