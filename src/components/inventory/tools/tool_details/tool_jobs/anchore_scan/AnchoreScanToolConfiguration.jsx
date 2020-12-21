import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "../../../../../common/model/modelHelpers";
import anchoreScanConnectionMetadata from "./anchore-scan-connection-metadata";
import ToolConfigurationEditorPanelContainer
  from "../../../../../common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import DtoTextInput from "../../../../../common/input/dto_input/dto-text-input";


function AnchoreScanToolConfiguration({ toolData, toolId, saveToolConfiguration, saveToVault }) {
  const [anchoreScanConfigurationDto, setAnchoreScanConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAnchoreScanConfigurationDto(modelHelpers.getToolConfigurationModel(toolData["configuration"], anchoreScanConnectionMetadata));
  };

  const saveAnchoreToolConfiguration = async () => {
      let newConfiguration = anchoreScanConfigurationDto.getPersistData();
      
      if (anchoreScanConfigurationDto.isChanged("accountPassword") && typeof(newConfiguration.accountPassword) === "string") {
        newConfiguration.accountPassword = await savePasswordToVault(toolId, toolData.tool_identifier, "secretKey", "Vault Secured Key", newConfiguration.accountPassword);
      }

      const item = {
        configuration: newConfiguration
      };
      return await saveToolConfiguration(item);
  };

  // TODO: If all of these are the same, we should put it in parent component
  const savePasswordToVault = async (toolId, toolIdentifier, key, name, value) => {
    const keyName = `${toolId}-${toolIdentifier}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await saveToVault(body);
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      return "";
    }
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={anchoreScanConfigurationDto}
      persistRecord={saveAnchoreToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Anchore"}
    >
      <Row>
        <Col sm={12}>
          <DtoTextInput dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"toolURL"} />
          <DtoTextInput dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"accountUsername"} />
          <DtoTextInput type={"password"} dataObject={anchoreScanConfigurationDto} setDataObject={setAnchoreScanConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AnchoreScanToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  saveToVault: PropTypes.func
};

export default AnchoreScanToolConfiguration;
