import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import AquasecMetadata from "./aquasec-tool-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

function AquasecToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [aquasecConfigurationModel, setAquasecConfigurationModel] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAquasecConfigurationModel(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), AquasecMetadata));
  };

  const saveAquasecToolConfiguration = async () => {
    let newConfiguration = aquasecConfigurationModel.getPersistData();
    const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(aquasecConfigurationModel, "accountPassword", newConfiguration.accountPassword, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={aquasecConfigurationModel}
      setModel={setAquasecConfigurationModel}
      persistRecord={saveAquasecToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.AQUASEC}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={aquasecConfigurationModel} setDataObject={setAquasecConfigurationModel} fieldName={"toolURL"} />
          <TextInputBase dataObject={aquasecConfigurationModel} setDataObject={setAquasecConfigurationModel} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={aquasecConfigurationModel} setDataObject={setAquasecConfigurationModel} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AquasecToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default AquasecToolConfiguration;
