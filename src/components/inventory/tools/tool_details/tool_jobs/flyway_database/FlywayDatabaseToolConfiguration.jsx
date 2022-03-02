import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import FlywayDatabaseConnectionMetadata from "./flyway-database-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import FlywayDatabaseTypeSelectInput from "components/common/list_of_values_input/tools/flyway_database/FlywayDatabaseTypeSelectInput";

function FlywayDatabaseToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [flywayConfigurationDto, setFlywayConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setFlywayConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), FlywayDatabaseConnectionMetadata));
  };

  const saveFlywayToolConfiguration = async () => {
    let newConfiguration = flywayConfigurationDto.getPersistData();
    newConfiguration.password = await toolsActions.savePasswordToVault(toolData, flywayConfigurationDto, "password", newConfiguration.password, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={flywayConfigurationDto}
      setModel={setFlywayConfigurationDto}
      persistRecord={saveFlywayToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"flyway-database-migrator"}
    >
      <Row>
        <Col sm={12}>
          <FlywayDatabaseTypeSelectInput dataObject={flywayConfigurationDto} setDataObject={setFlywayConfigurationDto} fieldName={"buildType"}/>
          <TextInputBase dataObject={flywayConfigurationDto} setDataObject={setFlywayConfigurationDto} fieldName={"url"} />
          <TextInputBase dataObject={flywayConfigurationDto} setDataObject={setFlywayConfigurationDto} fieldName={"port"} />
          <TextInputBase dataObject={flywayConfigurationDto} setDataObject={setFlywayConfigurationDto} fieldName={"userName"} />
          <VaultTextInput dataObject={flywayConfigurationDto} setDataObject={setFlywayConfigurationDto} fieldName={"password"}/>
          {flywayConfigurationDto && flywayConfigurationDto.getData("buildType") === "oracle" && <TextInputBase dataObject={flywayConfigurationDto} setDataObject={setFlywayConfigurationDto} fieldName={"service"} />}
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

FlywayDatabaseToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default FlywayDatabaseToolConfiguration;