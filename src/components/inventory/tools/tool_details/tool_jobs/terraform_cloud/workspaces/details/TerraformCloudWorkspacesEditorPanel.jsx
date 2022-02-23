import React, {useEffect, useContext, useState, useRef} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import terraformCloudWorkspacesActions from "components/inventory/tools/tool_details/tool_jobs/terraform_cloud/workspaces/terraformCloudWorkspaces.actions";
import StandaloneDeleteButtonWithConfirmationModal from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";
import TerraformCloudOrganizationsSelectInput from "./inputs/TerraformCloudOrganizationsSelectInput";

function TerraformCloudWorkspacesEditorPanel({ terraformCloudWorkspacesModel, setTerraformCloudWorkspacesModel, toolId, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [currentTerraformCloudOrganizationName, setCurrentTerraformCloudOrganizationName] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setCurrentTerraformCloudOrganizationName(terraformCloudWorkspacesModel?.getData('workspaceName'));

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createTerraformCloudWorkspace = async () => {
    const {organizationName, workspaceName} = terraformCloudWorkspacesModel.getPersistData();    
    return await terraformCloudWorkspacesActions.createTerraformCloudWorkspace(getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName);
  };

  const deleteTerraformCloudWorkspace = async () => {
    return await terraformCloudWorkspacesActions.deleteTerraformCloudWorkspace(getAccessToken, cancelTokenSource, toolId, currentTerraformCloudOrganizationName);
  };

  const getExtraButtons = () => {
    if (terraformCloudWorkspacesModel?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={terraformCloudWorkspacesModel}
          deleteDataFunction={deleteTerraformCloudWorkspace}
          handleCloseFunction={handleClose}
        />
      );
    }
  };

  return (
    <EditorPanelContainer
      recordDto={terraformCloudWorkspacesModel}
      setRecordDto={setTerraformCloudWorkspacesModel}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      createRecord={createTerraformCloudWorkspace}
      lenient={false}
      disable={terraformCloudWorkspacesModel?.checkCurrentValidity() !== true}
    >
      <Row>      
        <Col lg={12}>
          <TerraformCloudOrganizationsSelectInput 
            dataObject={terraformCloudWorkspacesModel} 
            setDataObject={setTerraformCloudWorkspacesModel} 
            toolId={toolId}
            disabled={!terraformCloudWorkspacesModel.isNew()}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={terraformCloudWorkspacesModel}
            setDataObject={setTerraformCloudWorkspacesModel}            
            fieldName={"workspaceName"}
            disabled={!terraformCloudWorkspacesModel.isNew()}
          />
        </Col>
      </Row>      
    </EditorPanelContainer>
  );
}

TerraformCloudWorkspacesEditorPanel.propTypes = {
  terraformCloudWorkspacesModel: PropTypes.object,
  setTerraformCloudWorkspacesModel: PropTypes.func,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
  toolData: PropTypes.object
};

export default TerraformCloudWorkspacesEditorPanel;
