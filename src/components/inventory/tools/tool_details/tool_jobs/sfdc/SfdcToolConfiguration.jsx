import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import sfdcConnectionMetadata from "./sfdc-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import { AuthContext } from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SFDCBuildTypeSelectInput from "components/common/list_of_values_input/workflow/pipelines/SFDCBuildTypeSelectInput";
import SfdcAuthTypeSelectInput from "./inputs/SfdcAuthTypeSelectInput";
import SfdcOAuthConnectButton from "./inputs/SfdcOAuthConnectButton";
import axios from "axios";

function SfdcToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [sfdcConfigurationDto, setSfdcConfigurationDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setSfdcConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), sfdcConnectionMetadata));
  };

  if (sfdcConfigurationDto == null) {
    return <></>;
  }

  const saveSfdcToolConfiguration = async () => {
    let newConfiguration = sfdcConfigurationDto.getPersistData();
    if (sfdcConfigurationDto?.getData("authType") === "basic") {
      const clientIdVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-client_id`;
      newConfiguration.sfdc_client_id = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_client_id", newConfiguration.sfdc_client_id, clientIdVaultKey, getAccessToken, toolData.getData("_id"));
      const clientSecretVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-client_secret`;
      newConfiguration.sfdc_client_secret = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_client_secret", newConfiguration.sfdc_client_secret, clientSecretVaultKey, getAccessToken, toolData.getData("_id"));
      const passwordVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-password`;
      newConfiguration.sfdc_password = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_password", newConfiguration.sfdc_password, passwordVaultKey, getAccessToken, toolData.getData("_id"));
      const tokenVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-token`;
      newConfiguration.sfdc_token = await toolsActions.saveKeyPasswordToVault(sfdcConfigurationDto, "sfdc_token", newConfiguration.sfdc_token, tokenVaultKey, getAccessToken, toolData.getData("_id"));
    }
    if (sfdcConfigurationDto?.getData("authType") === "oauth") {
      const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelTokenSource, toolData.id);
      const tool = response?.data?.data;
      newConfiguration.sfdc_refresh_token = tool?.configuration?.sfdc_refresh_token;      
    }

    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  const getDynamicFields = () => {
    if (sfdcConfigurationDto?.getData("authType") === "basic") {
      return (
        <>
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_client_id"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_client_secret"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_token"} />
          <VaultTextInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"sfdc_password"} />
        </>
      );
    }
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={sfdcConfigurationDto}
      setModel={setSfdcConfigurationDto}
      persistRecord={saveSfdcToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Sfdc"}
    >
      <Row>
        <Col sm={12}>
          <SfdcAuthTypeSelectInput model={sfdcConfigurationDto} setModel={setSfdcConfigurationDto} fieldName={"authType"} />
          <TextInputBase dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"accountUsername"} />
          {getDynamicFields()}
          <SFDCBuildTypeSelectInput dataObject={sfdcConfigurationDto} setDataObject={setSfdcConfigurationDto} fieldName={"buildType"} />
          <SfdcOAuthConnectButton
            model={sfdcConfigurationDto}
            authType={sfdcConfigurationDto?.getData("authType")}
            toolId={toolData.id}
            visible={sfdcConfigurationDto?.checkCurrentValidity() === true && !sfdcConfigurationDto?.isChanged()}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SfdcToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default SfdcToolConfiguration;
