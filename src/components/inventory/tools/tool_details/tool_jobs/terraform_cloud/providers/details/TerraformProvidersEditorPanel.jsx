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
import TerraformProviderServiceSelectInput from "./inputs/TerraformProviderServiceSelectInput";
import TerraformScmToolSelectInput from "./inputs/TerraformScmToolSelectInput";

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

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createTerraformVcsProvider = async () => {
    const {organizationName} = terraformProvidersModel.getPersistData();
    return await terraformProvidersActions.createTerraformVcsProvider(getAccessToken, cancelTokenSource, toolId, organizationName, terraformProvidersModel.getPersistData());
  };

  const deleteTerraformVcsProvider = async () => {
    const {organizationName, id} = terraformProvidersModel.getPersistData();
    const response = await terraformProvidersActions.deleteTerraformVcsProvider(getAccessToken, cancelTokenSource, toolId, organizationName, id);
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
      {!editMode && <>
        <Row>
          <Col lg={12}>
            <TerraformProviderServiceSelectInput
              model={terraformProvidersModel}
              setModel={setTerraformProvidersModel}
              disabled={editMode}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <TerraformScmToolSelectInput
              model={terraformProvidersModel}
              setModel={setTerraformProvidersModel}
              disabled={editMode}
            />
          </Col>
        </Row>
      </>}
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
