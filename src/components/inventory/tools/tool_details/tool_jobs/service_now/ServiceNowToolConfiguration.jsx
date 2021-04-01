import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import serviceNowConnectionMetadata from "./service-now-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function ServiceNowToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [serviceNowConfigurationDto, setServiceNowConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setServiceNowConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), serviceNowConnectionMetadata));
  };

  const saveServiceNowToolConfiguration = async () => {
    let newConfiguration = serviceNowConfigurationDto.getPersistData();

    const vaultKey = `${toolData.getData("_id")}-${toolData.getData("tool_identifier")}`;
    newConfiguration.secretKey = await toolsActions.saveKeyPasswordToVault(serviceNowConfigurationDto,"secretKey", newConfiguration.secretKey, vaultKey, getAccessToken, toolData.getData("_id"));
    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  if (serviceNowConfigurationDto == null) {
    return <></>;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={serviceNowConfigurationDto}
      persistRecord={saveServiceNowToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"servicenow"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={serviceNowConfigurationDto} setDataObject={setServiceNowConfigurationDto} fieldName={"toolURL"}/>
        </Col>
        <Col sm={12}>
          <TextInputBase dataObject={serviceNowConfigurationDto} setDataObject={setServiceNowConfigurationDto} fieldName={"userName"}/>
        </Col>
        <Col sm={12}>
          <VaultTextInput dataObject={serviceNowConfigurationDto} setDataObject={setServiceNowConfigurationDto} fieldName={"secretKey"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ServiceNowToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default ServiceNowToolConfiguration;