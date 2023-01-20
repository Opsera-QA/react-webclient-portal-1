import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import argoActions from "../../argo-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import ArgoClusterNamespaceInput from "./inputs/ArgoClusterNamespaceInput";
import ArgoGroupKindInput from "./inputs/ArgoGroupKindInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ArgoRepositorySelectInput
  from "components/common/list_of_values_input/tools/argo_cd/repositories/ArgoRepositorySelectInput";
import useComponentStateReference from "hooks/useComponentStateReference";

function ArgoProjectEditorPanel({ argoProjectData, toolId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [argoProjectModel, setArgoProjectModel] = useState(undefined);
  const { cancelTokenSource} = useComponentStateReference();

  useEffect(() => {
    setArgoProjectModel(argoProjectData);
  }, [argoProjectData]);

  const createProject = async () => {
    return await argoActions.createArgoProject(getAccessToken, cancelTokenSource, toolId, argoProjectModel);
  };

  const updateProject = async () => {
    return await argoActions.updateArgoProject(getAccessToken, cancelTokenSource, toolId, argoProjectModel);
  };

  const deleteProject = async () => {
    await argoActions.deleteArgoProject(getAccessToken, cancelTokenSource, toolId, argoProjectModel?.getData("projId"));
    handleClose();
  };

  if (argoProjectModel == null) {
    return <LoadingDialog size="sm" message={"Loading Data"} />;
  }

  return (
    <EditorPanelContainer
      recordDto={argoProjectModel}
      createRecord={createProject}
      updateRecord={updateProject}
      setRecordDto={setArgoProjectModel}
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
            <ArgoRepositorySelectInput
              fieldName={"sourceRepos"}
              model={argoProjectModel}
              setModel={setArgoProjectModel}
              argoToolId={toolId}
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
          <Col lg={12}>
            <ArgoGroupKindInput
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"namespaceResourceWhitelist"}
            />
          </Col>
          <Col lg={12}>
            <BooleanToggleInput 
              setDataObject={setArgoProjectModel}
              dataObject={argoProjectModel}
              fieldName={"orphanedResources"}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

ArgoProjectEditorPanel.propTypes = {
  argoProjectData: PropTypes.object,
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  projectId: PropTypes.string,
  handleClose: PropTypes.func
};

export default ArgoProjectEditorPanel;
