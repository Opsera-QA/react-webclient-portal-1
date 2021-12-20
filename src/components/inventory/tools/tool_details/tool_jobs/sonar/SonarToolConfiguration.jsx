import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import sonarConnectionMetadata from "components/inventory/tools/tool_details/tool_jobs/sonar/sonar-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import SonarEditionSelectInput from "components/common/list_of_values_input/tools/code_scan/SonarEditionSelectInput";

function SonarToolConfiguration( { toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [sonarConfigurationDto, setSonarConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSonarConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), sonarConnectionMetadata));
  };

  const saveSonarToolConfiguration = async () => {
    let newConfiguration = sonarConfigurationDto.getPersistData();
    const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.sonarAuthToken = await toolsActions.saveKeyPasswordToVault(sonarConfigurationDto,"sonarAuthToken", newConfiguration.sonarAuthToken, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={sonarConfigurationDto}
      setModel={setSonarConfigurationDto}
      persistRecord={saveSonarToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Sonarqube"}
    >
      <Row>
        <Col sm={12}>
          <SonarEditionSelectInput dataObject={sonarConfigurationDto} setDataObject={setSonarConfigurationDto} fieldName={"sonarEdition"} />
          <TextInputBase dataObject={sonarConfigurationDto} setDataObject={setSonarConfigurationDto} fieldName={"sonarUrl"} />
          <TextInputBase dataObject={sonarConfigurationDto} setDataObject={setSonarConfigurationDto} fieldName={"sonarPort"} />
          <TextInputBase dataObject={sonarConfigurationDto} setDataObject={setSonarConfigurationDto} fieldName={"sonarUserId"} />
          <VaultTextInput dataObject={sonarConfigurationDto} setDataObject={setSonarConfigurationDto} fieldName={"sonarAuthToken"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SonarToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default SonarToolConfiguration;