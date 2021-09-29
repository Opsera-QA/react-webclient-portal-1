import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import Row from "react-bootstrap/Row";
import argoActions from "../../argo-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import axios from "axios";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ArgoRepositoryInput from "./inputs/ArgoRepositoryInput";
import ArgoClusterNamespaceInput from "./inputs/ArgoClusterNamespaceInput";
import ArgoGroupKindInput from "./inputs/ArgoGroupKindInput";

function ArgoProjectEditorPanel({ argoProjectData, toolData, repoId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoProjectModel, setArgoProjectModel] = useState(undefined);
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

    if(argoProjectData) {
      loadData();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [argoProjectData]);

  const loadData = () => {
    try {
      setIsLoading(true);
      setArgoProjectModel(argoProjectData);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async () => {
    // return await argoActions.createArgoProject(getAccessToken, cancelTokenSource, toolData?._id, argoRepositoryModel);
  };

  const updateProject = async () => {
    // return await argoActions.updateArgoProject(getAccessToken, cancelTokenSource, toolData?._id, repoId, argoRepositoryModel);
  };

  const deleteProject = async () => {
    // await argoActions.deleteArgoProject(getAccessToken, cancelTokenSource, toolData?._id, repoId);
    handleClose();
  };

  if (isLoading || argoProjectModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoProjectModel}
      createRecord={createProject}
      updateRecord={updateProject}
      setRecordDto={setArgoProjectModel}
      isLoading={isLoading}
      extraButtons={
        <DeleteButtonWithInlineConfirmation
          dataObject={argoProjectModel}
          deleteRecord={deleteProject}
        />
      }
      handleClose={handleClose}
    >
      <div>
        <Row>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"name"}
              disabled={!argoProjectData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"description"}
              disabled={!argoProjectData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoRepositoryInput
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"sourceRepos"}
              argoToolId={toolData?._id}
              disabled={!argoProjectData?.isNew()}
            />
          </Col>
          <Col lg={12}>
            <ArgoClusterNamespaceInput
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
            />
          </Col>
          <Col lg={12}>
            <ArgoGroupKindInput
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"clusterResourceWhitelist"}
            />
          </Col>
          <Col lg={12}>
            <ArgoGroupKindInput
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"namespaceResourceBlacklist"}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

ArgoProjectEditorPanel.propTypes = {
  argoProjectData: PropTypes.object,
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  repoId: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoProjectEditorPanel;
