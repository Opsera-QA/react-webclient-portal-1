import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import SapCpqConnectionMetadata from "./sap-cpq-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import toolIdentifierConnectionCheckConstants
  from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function SapCpqToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [sapCpqConfigurationDto, setSapCpqConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setSapCpqConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), SapCpqConnectionMetadata));
  };

  const saveSapToolConfiguration = async () => {
    let newConfiguration = sapCpqConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, sapCpqConfigurationDto, "accountPassword", newConfiguration.accountPassword, getAccessToken);
    const item = {configuration: newConfiguration};
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };
  
  return (
    <ToolConfigurationEditorPanelContainer
      model={sapCpqConfigurationDto}
      setModel={setSapCpqConfigurationDto}
      persistRecord={saveSapToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.SAP_CPQ}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={sapCpqConfigurationDto} setDataObject={setSapCpqConfigurationDto} fieldName={"domainName"} />
          <TextInputBase dataObject={sapCpqConfigurationDto} setDataObject={setSapCpqConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={sapCpqConfigurationDto} setDataObject={setSapCpqConfigurationDto} fieldName={"accountPassword"} />
          <TextInputBase dataObject={sapCpqConfigurationDto} setDataObject={setSapCpqConfigurationDto} fieldName={"environment"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

SapCpqToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default SapCpqToolConfiguration;
