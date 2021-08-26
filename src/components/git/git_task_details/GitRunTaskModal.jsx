import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import ModalBase from "components/common/modal/ModalBase";
import CloseButton from "components/common/buttons/CloseButton";
import RunGitTaskButton from "components/common/buttons/git/RunGitTaskButton";
import SFDCGitBranchInput from "components/git/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCGitBranchInput";
import SFDCNewBranchBoolInput from "components/git/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCNewBranchBoolInput";
import SfdcGitUpstreamBranchInput from "components/git/git_task_details/configuration_forms/sfdc-org-sync/inputs/SfdcGitUpstreamBranchInput";
import SFDCGitBranchTextInput from "components/git/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCGitBranchTextInput";
import sfdcGitTaskConfigurationMetadata from "components/git/git_task_details/configuration_forms/sfdc-org-sync/sfdc-git-task-configuration-metadata";
import ec2ClusterCreationTaskConfigurationMetadata from "components/git/git_task_details/configuration_forms/ecs-cluster-creation/ecs-creation-git-task-configuration";
import sfdxCertGenTaskConfigurationMetadata from "components/git/git_task_details/configuration_forms/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import branchToBranchGitTaskConfigurationMetadata from "components/git/git_task_details/configuration_forms/branch-to-branch/branch-to-branch-git-task-configuration";
import sfdcGitBranchTaskConfigurationMetadata from "components/git/git_task_details/configuration_forms/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import ec2ServiceCreationTaskConfigurationMetadata from "components/git/git_task_details/configuration_forms/ecs-service-creation/ecs-service-creation-git-task-configuration";
import {AuthContext} from "contexts/AuthContext";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";

function GitRunTaskModal({ showModal, handleClose, gitTasksData, setGitTasksData, loadData }) {
  const [showHelp, setShowHelp] = useState(false);
  const [dataObj, setDataObj] = useState(undefined);
  const [canEdit, setCanEdit] = useState(false);
  const { getAccessRoleData } = useContext(AuthContext);

  useEffect(() => {
    loadRoles();
    loadConfig();
  }, []);

  const loadRoles = async() => {
    const customerAccessRules = await getAccessRoleData();
    const gitTask = gitTasksData.getPersistData();
    setCanEdit(workflowAuthorizedActions.gitItems(customerAccessRules, "edit_settings", gitTask.owner, gitTask.roles));
  };

  const loadConfig = () => {
    let configurationData;
    switch (gitTasksData.getData("type")) {
      case "sync-sfdc-repo":
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), sfdcGitTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case "sfdc-cert-gen":
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), sfdxCertGenTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case "sync-branch-structure":
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), sfdcGitBranchTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case "sync-git-branches":
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), branchToBranchGitTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case "ecs_cluster_creation":
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), ec2ClusterCreationTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case "ecs_service_creation":
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), ec2ServiceCreationTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      default:
        setDataObj(undefined);
    }
  };

  const getButtonContainer = () => {
    return (
      <>
        <CloseButton closeEditorCallback={handleClose} showUnsavedChangesMessage={false} />
        <RunGitTaskButton gitTasksData={gitTasksData} setGitTasksData={setGitTasksData} gitTasksConfigurationDataDto={dataObj} loadData={loadData} handleClose={handleClose} />
      </>
    );
  };

  const getRunView = () => {
    return (
      <>
        { canEdit && gitTasksData.getData("type") === "sync-sfdc-repo" && 
          <div style={{minHeight : "400px"}}>
            <Row className={"m-3"}>
              <Col lg={12}>
                <SFDCGitBranchInput dataObject={dataObj} setDataObject={setDataObj} visible={!(dataObj?.getData("isNewBranch"))}/>
              </Col>
              <Col lg={12}>
                <SFDCNewBranchBoolInput dataObject={dataObj} setDataObject={setDataObj} />
              </Col>
              {dataObj?.getData("isNewBranch") && 
                <>
                  <Col lg={12}>
                    <SFDCGitBranchTextInput
                      fieldName={"gitBranch"}
                      dataObject={dataObj} setDataObject={setDataObj} visible={dataObj?.getData("isNewBranch")}
                    />
                   </Col>
                  <Col lg={12}>
                    <SfdcGitUpstreamBranchInput dataObject={dataObj} setDataObject={setDataObj} />
                  </Col>
                </>
              }
            </Row>
          </div>
        }
      </>
    );
  };

  const getHelpComponent = () => {
    return null;
  };

  if (gitTasksData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ModalBase
      showModal={showModal}
      title="Opsera Task Confirmation"
      handleClose={handleClose}
      size={"xl"}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        helpComponent={getHelpComponent()}
        helpIsShown={showHelp}
        setHelpIsShown={setShowHelp}
        hideCloseButton={true}
      >
        <div className={"mb-3 mx-3"}>Do you want to run {gitTasksData.getData("name")} task?</div>
        {getRunView()}
      </OverlayPanelBodyContainer>
    </ModalBase>
  );
}

GitRunTaskModal.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default GitRunTaskModal;