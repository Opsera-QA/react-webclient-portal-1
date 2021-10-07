import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import argoConnectionMetadata from "./argo-connection-metadata";
import Col from "react-bootstrap/Col";
import toolsActions from "components/inventory/tools/tools-actions";
import modelHelpers from "components/common/model/modelHelpers";
import {AuthContext} from "contexts/AuthContext";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";

function ArgoToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [argoConfigurationDto, setArgoConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setArgoConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), argoConnectionMetadata));
  };

  const saveArgoToolConfiguration = async () => {
    let newConfiguration = argoConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, argoConfigurationDto,"accountPassword", newConfiguration.accountPassword, getAccessToken);
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={argoConfigurationDto}
      setModel={setArgoConfigurationDto}
      persistRecord={saveArgoToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Argocd"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"userName"} />
          <VaultTextInput dataObject={argoConfigurationDto} setDataObject={setArgoConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ArgoToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default ArgoToolConfiguration;
