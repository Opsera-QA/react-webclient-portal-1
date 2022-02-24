import React, {useEffect, useContext, useState, useRef} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import terraformCloudWorkspacesActions from "components/inventory/tools/tool_details/tool_jobs/terraform_cloud/workspaces/terraformCloudWorkspaces.actions";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import TerraformCloudOrganizationsSelectInput from "./inputs/TerraformCloudOrganizationsSelectInput";
import {DialogToastContext} from "contexts/DialogToastContext";
import TextAreaClipboardField from "components/common/fields/clipboard/TextAreaClipboardField";
import InlineLoadingDialog from "components/common/status_notifications/loading/InlineLoadingDialog";

function TerraformCloudWorkspacesEditorPanel({ 
  terraformCloudWorkspacesModel, 
  setTerraformCloudWorkspacesModel, 
  toolId, 
  handleClose, 
  editMode 
}) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [ isLoading, setIsLoading ] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [workspaceConfiguration, setWorkspaceConfiguration] = useState("Workspace configuration not found. Please try again.");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if(isMounted?.current === true){
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    
    if (!editMode) {
      return;
    }

    try {
      setIsLoading(true);
      const {organizationName, workspaceName} = terraformCloudWorkspacesModel.getPersistData();
      const response = await terraformCloudWorkspacesActions.getTerraformCloudWorkspaceConfiguration(getAccessToken, cancelSource, toolId, organizationName, workspaceName);      
      setWorkspaceConfiguration(response?.data?.data);      
    } catch (error) {
      if(isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true) {
        setIsLoading(false);
      }      
    }
  };

  const createTerraformCloudWorkspace = async () => {
    const {organizationName, workspaceName} = terraformCloudWorkspacesModel.getPersistData();
    return await terraformCloudWorkspacesActions.createTerraformCloudWorkspace(getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName);
  };

  const deleteTerraformCloudWorkspace = async () => {
    const {organizationName, workspaceName} = terraformCloudWorkspacesModel.getPersistData();
    const response = await terraformCloudWorkspacesActions.deleteTerraformCloudWorkspace(getAccessToken, cancelTokenSource, toolId, organizationName, workspaceName);
    handleClose();
  };

  const getExtraButtons = () => {    
    if (editMode) {      
      return (        
        <DeleteButtonWithInlineConfirmation
          dataObject={terraformCloudWorkspacesModel}
          deleteRecord={deleteTerraformCloudWorkspace}
        />
      );
    }
  };

  const getWorkspaceConfigurationFields = () => {
    if (editMode) {
      return (
        <Row>
          <Col lg={12}>
            <TextAreaClipboardField            
              allowResize={false}
              rows={10}
              textAreaValue={workspaceConfiguration}
              description={`You can add this configuration block to any .tf file in the directory where you run Terraform.`}
            />
          </Col>
        </Row>
      );
    }
  };

  if (isLoading) {
    return (<InlineLoadingDialog />);
  }

  return (
    <EditorPanelContainer
      recordDto={terraformCloudWorkspacesModel}
      setRecordDto={setTerraformCloudWorkspacesModel}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      createRecord={createTerraformCloudWorkspace}
      lenient={false}
      disable={terraformCloudWorkspacesModel?.checkCurrentValidity() !== true || editMode}
    >
      <Row>      
        <Col lg={12}>
          <TerraformCloudOrganizationsSelectInput 
            dataObject={terraformCloudWorkspacesModel} 
            setDataObject={setTerraformCloudWorkspacesModel} 
            toolId={toolId}
            disabled={editMode}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={terraformCloudWorkspacesModel}
            setDataObject={setTerraformCloudWorkspacesModel}            
            fieldName={"workspaceName"}
            disabled={editMode}
          />
        </Col>
      </Row>
      { getWorkspaceConfigurationFields() }      
    </EditorPanelContainer>
  );
}

TerraformCloudWorkspacesEditorPanel.propTypes = {
  terraformCloudWorkspacesModel: PropTypes.object,
  setTerraformCloudWorkspacesModel: PropTypes.func,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
  toolData: PropTypes.object,
  editMode: PropTypes.bool,
};

export default TerraformCloudWorkspacesEditorPanel;
