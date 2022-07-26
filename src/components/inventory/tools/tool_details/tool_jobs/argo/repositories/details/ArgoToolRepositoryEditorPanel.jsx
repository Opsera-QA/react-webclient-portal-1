import React, {useEffect, useContext, useState} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import argoActions from "../../argo-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ArgoRepositoryScmTypeSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/inputs/ArgoRepositoryScmTypeSelectInput";
import ArgoRepositorySourceControlToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/inputs/ArgoRepositorySourceControlToolSelectInput";
import ArgoBitbucketWorkspaceInput from "./inputs/ArgoBitbucketWorkspaceInput";
import ArgoGitRepositoryInput from "./inputs/ArgoGitRepositoryInput";
import ArgoRepositoriesArgoProjectSelectInput from "./inputs/ArgoRepositoriesArgoProjectSelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function ArgoToolRepositoryEditorPanel({ argoRepositoryData, toolId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [argoRepositoryModel, setArgoRepositoryModel] = useState(undefined);
  const { cancelTokenSource} = useComponentStateReference();

  useEffect(() => {
    setArgoRepositoryModel(argoRepositoryData);
  }, [argoRepositoryData]);

  const createRepository = async () => {
    return await argoActions.createArgoRepository(getAccessToken, cancelTokenSource, toolId, argoRepositoryModel);
  };

  const updateRepository = async () => {
    return await argoActions.updateArgoRepository(getAccessToken, cancelTokenSource, toolId, argoRepositoryModel);
  };

  const deleteRepository = async () => {
    await argoActions.deleteArgoRepository(getAccessToken, cancelTokenSource, toolId, argoRepositoryModel?.getData("repoId"));
    handleClose();
  };

  if (argoRepositoryModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoRepositoryModel}
      createRecord={createRepository}
      updateRecord={updateRepository}
      setRecordDto={setArgoRepositoryModel}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={argoRepositoryModel}
          deleteRecord={deleteRepository}
        />
      }
      handleClose={handleClose}
    >
      <div>
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              fieldName={"name"}
              disabled={argoRepositoryData?.isNew() !== true}
            />
          </Col>
          <Col lg={12}>
            <ArgoRepositoriesArgoProjectSelectInput 
              argoToolId={toolId}
              setModel={setArgoRepositoryModel}
              model={argoRepositoryModel}
              fieldName={"projectName"}
              disabled={argoRepositoryData?.isNew() !== true}
            />
          </Col>
          <Col lg={12}>
            <ArgoRepositoryScmTypeSelectInput
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              disabled={argoRepositoryData?.isNew() !== true}
            />
          </Col>
          <Col lg={12}>
            <ArgoRepositorySourceControlToolSelectInput
              setModel={setArgoRepositoryModel}
              model={argoRepositoryModel}
              disabled={argoRepositoryData?.isNew() !== true}
            />
          </Col>
          <Col lg={12}>
            <ArgoBitbucketWorkspaceInput
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              disabled={argoRepositoryData?.isNew() !== true}
            />
          </Col>
          <Col lg={12}>
            <ArgoGitRepositoryInput
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              disabled={argoRepositoryData?.isNew() !== true}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

ArgoToolRepositoryEditorPanel.propTypes = {
  argoRepositoryData: PropTypes.object,
  toolId: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoToolRepositoryEditorPanel;
