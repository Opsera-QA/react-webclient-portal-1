import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import anchoreIntegratorConnectionMetadata from "./anchore-integrator-connection-metadata";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function AnchoreIntegratorToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [anchoreIntegratorConfigurationDto, setAnchoreIntegratorConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAnchoreIntegratorConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), anchoreIntegratorConnectionMetadata));
  };

  const saveAnchoreIntegratorToolConfiguration = async () => {
      let newConfiguration = anchoreIntegratorConfigurationDto.getPersistData();
      const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
      newConfiguration.accountPassword = await toolsActions.saveKeyPasswordToVault(anchoreIntegratorConfigurationDto, "accountPassword", newConfiguration.accountPassword, vaultKey, getAccessToken, toolData.getData("_id"));
      const item = { configuration: newConfiguration };
      return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={anchoreIntegratorConfigurationDto}
      setModel={setAnchoreIntegratorConfigurationDto}
      persistRecord={saveAnchoreIntegratorToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Anchore"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={anchoreIntegratorConfigurationDto} setDataObject={setAnchoreIntegratorConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={anchoreIntegratorConfigurationDto} setDataObject={setAnchoreIntegratorConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={anchoreIntegratorConfigurationDto} setDataObject={setAnchoreIntegratorConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AnchoreIntegratorToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default AnchoreIntegratorToolConfiguration;

