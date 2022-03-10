import React, {useEffect, useContext, useState, useRef} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import terraformProvidersActions from "components/inventory/tools/tool_details/tool_jobs/terraform_cloud/providers/terraformProviders.actions";
import DeleteButtonWithInlineConfirmation from "components/common/buttons/delete/DeleteButtonWithInlineConfirmation";
import TerraformCloudOrganizationsSelectInput from "./inputs/TerraformCloudOrganizationsSelectInput";
import {DialogToastContext} from "contexts/DialogToastContext";
import TextAreaClipboardField from "components/common/fields/clipboard/TextAreaClipboardField";
import InlineLoadingDialog from "components/common/status_notifications/loading/InlineLoadingDialog";

function TerraformProvidersEditorPanel({ 
  terraformProvidersModel, 
  setTerraformProvidersModel, 
  toolId, 
  handleClose, 
  editMode 
}) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [ isLoading, setIsLoading ] = useState(false);
  const toastContext = useContext(DialogToastContext);

  const createTerraformVcsProvider = async () => {
    const {organizationName, vcsProviderName} = terraformProvidersModel.getPersistData();
    return await terraformProvidersActions.createTerraformVcsProvider(getAccessToken, cancelTokenSource, toolId, organizationName, vcsProviderName);
  };

  const deleteTerraformVcsProvider = async () => {
    const {organizationName, vcsProviderName} = terraformProvidersModel.getPersistData();
    const response = await terraformProvidersActions.deleteTerraformVcsProvider(getAccessToken, cancelTokenSource, toolId, organizationName, vcsProviderName);
    handleClose();
  };

  const getExtraButtons = () => {    
    if (editMode) {      
      return (        
        <DeleteButtonWithInlineConfirmation
          dataObject={terraformProvidersModel}
          deleteRecord={deleteTerraformVcsProvider}
        />
      );
    }
  };

  if (isLoading) {
    return (<InlineLoadingDialog />);
  }

  return (
    <EditorPanelContainer
      recordDto={terraformProvidersModel}
      setRecordDto={setTerraformProvidersModel}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      createRecord={createTerraformVcsProvider}
      lenient={false}
      disable={terraformProvidersModel?.checkCurrentValidity() !== true || editMode}
    >
      <Row>      
        <Col lg={12}>
          <TerraformCloudOrganizationsSelectInput 
            dataObject={terraformProvidersModel} 
            setDataObject={setTerraformProvidersModel} 
            toolId={toolId}
            disabled={editMode}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={terraformProvidersModel}
            setDataObject={setTerraformProvidersModel}            
            fieldName={"vcsProviderName"}
            disabled={editMode}
          />
        </Col>
      </Row>            
    </EditorPanelContainer>
  );
}

TerraformProvidersEditorPanel.propTypes = {
  terraformProvidersModel: PropTypes.object,
  setTerraformProvidersModel: PropTypes.func,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
  toolData: PropTypes.object,
  editMode: PropTypes.bool,
};

export default TerraformProvidersEditorPanel;
