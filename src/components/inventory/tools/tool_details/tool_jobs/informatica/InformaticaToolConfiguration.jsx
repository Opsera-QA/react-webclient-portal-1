import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import InformaticaConnectionMetadata from "./informatica-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import InformaticaRegionSelectInput from "components/common/list_of_values_input/tools/informatica/InformaticaRegionSelectInput";

function InformaticaToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [informaticaConfigurationDto, setInformaticaConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setInformaticaConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), InformaticaConnectionMetadata));
  };

  const saveInformaticaToolConfiguration = async () => {
    let newConfiguration = informaticaConfigurationDto.getPersistData();
    newConfiguration.password = await toolsActions.savePasswordToVault(toolData, informaticaConfigurationDto, "password", newConfiguration.password, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={informaticaConfigurationDto}
      setModel={setInformaticaConfigurationDto}
      persistRecord={saveInformaticaToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"informatica"}
    >
      <Row>
        <Col sm={12}>
          <InformaticaRegionSelectInput dataObject={informaticaConfigurationDto} setDataObject={setInformaticaConfigurationDto} fieldName={"regions"} />
          <TextInputBase dataObject={informaticaConfigurationDto} setDataObject={setInformaticaConfigurationDto} fieldName={"userName"} />
          <VaultTextInput dataObject={informaticaConfigurationDto} setDataObject={setInformaticaConfigurationDto} fieldName={"password"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

InformaticaToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default InformaticaToolConfiguration;