import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import AzureDevopsConnectionMetadata from "./azureDevops-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";

function AzureDevopsToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [azureDevopsConfigurationDto, setAzureDevopsConfigurationDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setAzureDevopsConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), AzureDevopsConnectionMetadata));
  };

  const saveAzureDevopsToolConfiguration = async () => {
    const newConfiguration = azureDevopsConfigurationDto.getPersistData();
    newConfiguration.accessToken = await toolsActions.saveThreePartToolPasswordToVaultV2(getAccessToken, cancelTokenSource, toolData, azureDevopsConfigurationDto, "accessToken", newConfiguration.accessToken);
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={azureDevopsConfigurationDto}
      setModel={setAzureDevopsConfigurationDto}
      persistRecord={saveAzureDevopsToolConfiguration}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <VaultTextInput dataObject={azureDevopsConfigurationDto} setDataObject={setAzureDevopsConfigurationDto} fieldName={"accessToken"}/>
          <TextInputBase dataObject={azureDevopsConfigurationDto} setDataObject={setAzureDevopsConfigurationDto} fieldName={"organization"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AzureDevopsToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default AzureDevopsToolConfiguration;
