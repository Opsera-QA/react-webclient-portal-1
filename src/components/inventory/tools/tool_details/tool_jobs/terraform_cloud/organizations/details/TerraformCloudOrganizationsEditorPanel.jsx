import React, {useEffect, useContext, useState, useRef} from "react";
import { Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import terraformCloudOrganizationsActions from "components/inventory/tools/tool_details/tool_jobs/terraform_cloud/organizations/terraformCloudOrganizations.actions";
import StandaloneDeleteButtonWithConfirmationModal from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";

function TerraformCloudOrganizationsEditorPanel({ terraformCloudOrganizationsModel, setTerraformCloudOrganizationsModel, toolId, handleClose }) {
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

    setCurrentTerraformCloudOrganizationName(terraformCloudOrganizationsModel?.getData('organizationName'));

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createAzureStorageCredentials = async () => {
    const {newAzureStorageAccountName, newAzureStorageAccountToken} = terraformCloudOrganizationsModel.getPersistData();
    return await terraformCloudOrganizationsActions.createTerraformCloudOrganization(getAccessToken, cancelTokenSource, toolId, terraformCloudOrganizationsModel, newAzureStorageAccountName, newAzureStorageAccountToken);
  };

  const deleteAzureStorageCredentials = async () => {
    return await terraformCloudOrganizationsActions.deleteTerraformCloudOrganization(getAccessToken, cancelTokenSource, toolId, currentTerraformCloudOrganizationName);
  };

  const getExtraButtons = () => {
    if (terraformCloudOrganizationsModel?.isNew() === false) {
      return (
        <StandaloneDeleteButtonWithConfirmationModal
          model={terraformCloudOrganizationsModel}
          deleteDataFunction={deleteAzureStorageCredentials}
          handleCloseFunction={handleClose}
        />
      );
    }
  };

  return (
    <EditorPanelContainer
      recordDto={terraformCloudOrganizationsModel}
      setRecordDto={setTerraformCloudOrganizationsModel}
      handleClose={handleClose}
      extraButtons={getExtraButtons()}
      createRecord={createAzureStorageCredentials}
      lenient={false}
      disable={terraformCloudOrganizationsModel?.checkCurrentValidity() !== true}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase
            dataObject={terraformCloudOrganizationsModel}
            setDataObject={setTerraformCloudOrganizationsModel}            
            fieldName={"organizationName"}
            disabled={!terraformCloudOrganizationsModel.isNew()}
          />
        </Col>
      </Row>      
    </EditorPanelContainer>
  );
}

TerraformCloudOrganizationsEditorPanel.propTypes = {
  terraformCloudOrganizationsModel: PropTypes.object,
  setTerraformCloudOrganizationsModel: PropTypes.func,
  toolId: PropTypes.string,
  handleClose: PropTypes.func,
  toolData: PropTypes.object
};

export default TerraformCloudOrganizationsEditorPanel;
