import React, { useEffect, useContext, useState, useRef } from "react";
import { Col, Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "../../../../../../common/buttons/delete/DeleteButtonWithInlineConfirmation";
import GitScraperBitbucketWorkspaceSelectInput from "../../inputs/GitScraperBitbucketWorkspaceSelectInput";
import GitScraperGitRepositorySelectInput from "../../inputs/GitScraperGitRepositorySelectInput";
import GitScraperGitBranchSelectInput from "../../inputs/GitScraperGitBranchSelectInput";
import modelHelpers from "../../../../../../common/model/modelHelpers";
import gitScraperReposMetadata from "../gitscraper-repos-metadata";
import taskActions from "../../../../../task.actions";
import GitIgnoreToggleInput from "../../inputs/GitIgnoreToggleInput";

function GitScraperReposEditorPanel({
  gitScraperReposData,
  setParentDataObject,
  applicationId,
  handleClose,
  parentDataObject,
  gitScraperRepos,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [gitScraperReposModel, setGitScraperReposModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (gitScraperReposData) {
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

  const _validateData = async (gitScraperRepos) => {
    for (let repo in gitScraperRepos) {
      ["$height"].forEach((key) => {
        if (gitScraperRepos[repo][key]) {
          delete gitScraperRepos[repo][key];
        }
      });
    }
  };

  const updateApplication = async () => {
    setIsLoading(true);
    let newConfiguration = gitScraperReposModel.getPersistData();
    if (applicationId?.toString() && gitScraperRepos[applicationId]) {
      gitScraperRepos[applicationId] = newConfiguration;
    } else {
      let currentRepos = gitScraperRepos;
      gitScraperRepos = [...currentRepos, newConfiguration];
    }
    await _validateData(gitScraperRepos);
    let gitTaskConfig = parentDataObject.getPersistData();
    gitTaskConfig.configuration.reposToScan = gitScraperRepos;
    parentDataObject?.setData("configuration", gitTaskConfig.configuration);
    await taskActions.updateGitTaskV2(
      getAccessToken,
      axios.CancelToken.source(),
      parentDataObject,
    );
    setParentDataObject(gitScraperRepos);
    await loadData();
    setIsLoading(false);
    handleClose();
  };

  const deleteApplication = async () => {
    setIsLoading(true);
    if (applicationId?.toString() && gitScraperRepos[applicationId]) {
      gitScraperRepos.splice(applicationId, 1);
    }
    await _validateData(gitScraperRepos);
    let gitTaskConfig = parentDataObject.getPersistData();
    gitTaskConfig.configuration.reposToScan = gitScraperRepos;
    parentDataObject?.setData("configuration", gitTaskConfig.configuration);
    await taskActions.updateGitTaskV2(
      getAccessToken,
      axios.CancelToken.source(),
      parentDataObject,
    );
    setParentDataObject(gitScraperRepos);
    setIsLoading(false);
    await loadData();
    handleClose();
  };

  if (isLoading || gitScraperReposModel == null) {
    return (
      <LoadingDialog
        size="sm"
        message={"Loading Data"}
      />
    );
  }

  const getExtraButtons = () => {
    if (!gitScraperReposModel?.isNew() && applicationId?.toString()) {
      return (
        <DeleteButtonWithInlineConfirmation
          dataObject={gitScraperReposModel}
          deleteRecord={deleteApplication}
        />
      );
    }
  };

  if (gitScraperRepos?.length >= 15) {
    return (
      <div className={"p-3"}>
        <Card className={"mt-3 mb-1"}>
          <Card.Header as="h6">Configure Repositories</Card.Header>
          <Card.Body>
            <Card.Text>
              Maximum repository limit of 15 reached. You must delete an
              existing repository in order to add a new one.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <EditorPanelContainer
      recordDto={gitScraperReposModel}
      createRecord={createApplication}
      updateRecord={updateApplication}
      setRecordDto={setGitScraperReposModel}
      isLoading={isLoading}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
    >
      <div className="scroll-y hide-x-overflow">
        <Row>
          <Col lg={12}>
            <GitScraperBitbucketWorkspaceSelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
              service={parentDataObject?.data?.configuration?.service}
              gitToolId={parentDataObject?.data?.configuration?.gitToolId}
            />
          </Col>
          <Col lg={12}>
            <GitScraperGitRepositorySelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
              service={parentDataObject?.data?.configuration?.service}
              gitToolId={parentDataObject?.data?.configuration?.gitToolId}
            />
          </Col>
          <Col lg={12}>
            <GitScraperGitBranchSelectInput
              model={gitScraperReposModel}
              setModel={setGitScraperReposModel}
              service={parentDataObject?.data?.configuration?.service}
              gitToolId={parentDataObject?.data?.configuration?.gitToolId}
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
  setParentDataObject: PropTypes.func,
  parentDataObject: PropTypes.object,
  loadData: PropTypes.func,
  applicationId: PropTypes.number,
  handleClose: PropTypes.func,
  gitScraperRepos: PropTypes.array,
};

export default GitScraperReposEditorPanel;
