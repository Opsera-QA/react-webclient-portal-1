import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import TwistlockConnectionMetadata from "./twistlock-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function TwistlockToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [twistlockConfigurationDto, setTwistlockConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setTwistlockConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), TwistlockConnectionMetadata));
  };

  const saveTwistlockToolConfiguration = async () => {
    let newConfiguration = twistlockConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, twistlockConfigurationDto, "accountPassword", newConfiguration.accountPassword, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={twistlockConfigurationDto}
      setModel={setTwistlockConfigurationDto}
      persistRecord={saveTwistlockToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"twistlock"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={twistlockConfigurationDto} setDataObject={setTwistlockConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={twistlockConfigurationDto} setDataObject={setTwistlockConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={twistlockConfigurationDto} setDataObject={setTwistlockConfigurationDto} fieldName={"accountPassword"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

TwistlockToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default TwistlockToolConfiguration;