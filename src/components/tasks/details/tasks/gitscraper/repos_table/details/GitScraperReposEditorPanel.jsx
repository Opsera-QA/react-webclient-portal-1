import React, {useEffect, useContext, useState, useRef} from "react";
import { Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import azureActions from "../../../../../../inventory/tools/tool_details/tool_jobs/azureV2/azure-actions";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import toolsActions from "../../../../../../inventory/tools/tools-actions";
import DeleteButtonWithInlineConfirmation
  from "../../../../../../common/buttons/delete/DeleteButtonWithInlineConfirmation";
import GitScraperBitbucketWorkspaceSelectInput
  from "../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/gitscraper/inputs/GitScraperBitbucketWorkspaceSelectInput";
import GitScraperGitRepositorySelectInput
  from "../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/gitscraper/inputs/GitScraperGitRepositorySelectInput";
import GitScraperGitBranchSelectInput
  from "../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/gitscraper/inputs/GitScraperGitBranchSelectInput";
import modelHelpers from "../../../../../../common/model/modelHelpers";
import gitScraperReposMetadata from "../gitscraper-repos-metadata";
import GitScraperScmToolTypeSelectInput from "../../inputs/GitScraperScmToolTypeSelectInput";
import GitScraperScmToolSelectInput from "../../inputs/GitScraperScmToolSelectInput";
import taskActions from "../../../../../task.actions";
import GitIgnoreToggleInput
  from "../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/gitscraper/inputs/GitIgnoreToggleInput";

function GitScraperReposEditorPanel({ gitScraperReposData, setParentDataObject, applicationId, handleClose, parentDataObject }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [gitScraperReposModel, setGitScraperReposModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  console.log(gitScraperReposData);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if(gitScraperReposData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [gitScraperReposData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      const configurationData = modelHelpers.getToolConfigurationModel(
        gitScraperReposData?.getPersistData(),
        gitScraperReposMetadata,
      );
      setGitScraperReposModel({ ...configurationData });
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async () => {
    let newConfiguration = gitScraperReposModel.getPersistData();
    let currentRepos = parentDataObject?.getData("reposToScan");
    let updatedRepos = [...currentRepos, newConfiguration];
    parentDataObject?.setData("reposToScan", updatedRepos);
    return true;
  };

  const updateApplication = async () => {
    setIsLoading(true);
    let newConfiguration = gitScraperReposModel.getPersistData();
    let currentRepos = parentDataObject?.getData("reposToScan");
    if (applicationId && currentRepos[applicationId]) {
      currentRepos[applicationId] = newConfiguration;
    } else {
      currentRepos = [newConfiguration];
    }
    let gitTaskConfig = parentDataObject.getPersistData();
    gitTaskConfig.configuration.reposToScan = currentRepos;
    parentDataObject?.setData("configuration", gitTaskConfig.configuration);
    await taskActions.updateGitTaskV2(getAccessToken, axios.CancelToken.source(), parentDataObject);
    setIsLoading(false);
    handleClose();
  };

  const deleteApplication = async () => {
    await azureActions.deleteAzureCredential(getAccessToken, cancelTokenSource, setParentDataObject?._id, applicationId);
    handleClose();
  };

  if (isLoading || gitScraperReposModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={gitScraperReposModel}
      createRecord={createApplication}
      updateRecord={updateApplication}
      setRecordDto={setGitScraperReposModel}
      isLoading={isLoading}
      handleClose={handleClose}
    >
      <div className="scroll-y hide-x-overflow">
        <Row>
          <Col lg={12}>
            <GitScraperScmToolTypeSelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
            />
          </Col>
          <Col lg={12}>
            <GitScraperScmToolSelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
            />
          </Col>
          <Col lg={12}>
            <GitScraperBitbucketWorkspaceSelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
            />
          </Col>
          <Col lg={12}>
            <GitScraperGitRepositorySelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
            />
          </Col>
          <Col lg={12}>
            <GitScraperGitBranchSelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
            />
          </Col>
          <Col lg={12}>
            <GitIgnoreToggleInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
              fieldName={"filesException"}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

GitScraperReposEditorPanel.propTypes = {
  gitScraperReposData: PropTypes.object,
  setParentDataObject: PropTypes.object,
  parentDataObject: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.string,
  handleClose: PropTypes.func
};

export default GitScraperReposEditorPanel;
