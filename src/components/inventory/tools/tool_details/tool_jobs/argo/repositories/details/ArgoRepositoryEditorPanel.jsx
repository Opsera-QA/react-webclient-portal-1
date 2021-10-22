import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import argoActions from "../../argo-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ArgoRepositoryScmTypeSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/inputs/ArgoRepositoryScmTypeSelectInput";
import ArgoRepositorySourceControlToolSelectInput from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/details/inputs/ArgoRepositorySourceControlToolSelectInput";
import ArgoBitbucketWorkspaceInput from "./inputs/ArgoBitbucketWorkspaceInput";
import ArgoGitRepositoryInput from "./inputs/ArgoGitRepositoryInput";

function ArgoRepositoryEditorPanel({ argoRepositoryData, toolData, repoId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoRepositoryModel, setArgoRepositoryModel] = useState(undefined);
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

    if(argoRepositoryData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoRepositoryData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setArgoRepositoryModel(argoRepositoryData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createRepository = async () => {
    return await argoActions.createArgoRepository(getAccessToken, cancelTokenSource, toolData?._id, argoRepositoryModel);
  };

  const updateRepository = async () => {
    return await argoActions.updateArgoRepository(getAccessToken, cancelTokenSource, toolData?._id, repoId, argoRepositoryModel);
  };

  const deleteRepository = async () => {
    await argoActions.deleteArgoRepository(getAccessToken, cancelTokenSource, toolData?._id, repoId);
    handleClose();
  };

  if (isLoading || argoRepositoryModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoRepositoryModel}
      createRecord={createRepository}
      updateRecord={updateRepository}
      setRecordDto={setArgoRepositoryModel}
      isLoading={isLoading}
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
              disabled={!argoRepositoryData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoRepositoryScmTypeSelectInput
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              disabled={!argoRepositoryData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoRepositorySourceControlToolSelectInput
              setModel={setArgoRepositoryModel}
              model={argoRepositoryModel}
              disabled={!argoRepositoryData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoBitbucketWorkspaceInput
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              disabled={!argoRepositoryData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoGitRepositoryInput
              setDataObject={setArgoRepositoryModel}
              dataObject={argoRepositoryModel}
              disabled={!argoRepositoryData?.isNew()}
            />
          </Col>

        </Row>
      </div>
    </EditorPanelContainer>
  );
}

ArgoRepositoryEditorPanel.propTypes = {
  argoRepositoryData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  repoId: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoRepositoryEditorPanel;
