import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import octopusConnectionMetadata from "./octopus-connection-metadata";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";

function OctopusToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [octopusConfigurationDto, setOctopusConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setOctopusConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), octopusConnectionMetadata));
  };

  const saveOctopusToolConfiguration = async () => {
    let newConfiguration = octopusConfigurationDto.getPersistData();
    const octopusApiVaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}-secretKey`;
    newConfiguration.octopusApiKey = await toolsActions.saveKeyPasswordToVault(octopusConfigurationDto, "octopusApiKey", newConfiguration.octopusApiKey, octopusApiVaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={octopusConfigurationDto}
      setModel={setOctopusConfigurationDto}
      persistRecord={saveOctopusToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Octopus"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={octopusConfigurationDto} setDataObject={setOctopusConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={octopusConfigurationDto} setDataObject={setOctopusConfigurationDto} fieldName={"userName"} />
          <VaultTextInput dataObject={octopusConfigurationDto} setDataObject={setOctopusConfigurationDto} fieldName={"octopusApiKey"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

OctopusToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default OctopusToolConfiguration;