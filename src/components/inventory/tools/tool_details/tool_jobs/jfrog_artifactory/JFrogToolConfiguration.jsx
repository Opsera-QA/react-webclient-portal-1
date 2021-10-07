import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import jfrogConnectionMetadata from "./jfrog-connection-metadata";
import Col from "react-bootstrap/Col";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";

function JFrogToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [JFrogConfigurationDto, setJFrogConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setJFrogConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), jfrogConnectionMetadata));
  };

  const saveJFrogToolConfiguration = async () => {
    let newConfiguration = JFrogConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, JFrogConfigurationDto,"accountPassword", newConfiguration.accountPassword, getAccessToken);
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={JFrogConfigurationDto}
      setModel={JFrogConfigurationDto}
      persistRecord={saveJFrogToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"jfrog"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={JFrogConfigurationDto} setDataObject={setJFrogConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={JFrogConfigurationDto} setDataObject={setJFrogConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={JFrogConfigurationDto} setDataObject={setJFrogConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

JFrogToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default JFrogToolConfiguration;
