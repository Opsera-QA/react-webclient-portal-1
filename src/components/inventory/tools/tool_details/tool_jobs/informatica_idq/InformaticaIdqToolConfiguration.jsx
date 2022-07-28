import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import InformaticaIdqConnectionMetadata from "./informatica-idq-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function InformaticaIdqToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [informaticaIdqConfigurationDto, setInformaticaIdqConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setInformaticaIdqConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), InformaticaIdqConnectionMetadata));
  };

  const saveInformaticaIdqToolConfiguration = async () => {
    let newConfiguration = informaticaIdqConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, informaticaIdqConfigurationDto, "accountPassword", newConfiguration.accountPassword, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={informaticaIdqConfigurationDto}
      setModel={setInformaticaIdqConfigurationDto}
      persistRecord={saveInformaticaIdqToolConfiguration}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"domainName"} />
          <TextInputBase dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"domainGateway"} />
          <TextInputBase dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"accountPassword"}/>
          <TextInputBase dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"securityGroup"} />
          <TextInputBase dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"repositoryService"} />
          <TextInputBase dataObject={informaticaIdqConfigurationDto} setDataObject={setInformaticaIdqConfigurationDto} fieldName={"dataIntegrationServer"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

InformaticaIdqToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default InformaticaIdqToolConfiguration;