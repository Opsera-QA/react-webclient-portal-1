import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import modelHelpers from "components/common/model/modelHelpers";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Col from "react-bootstrap/Col";
import DtoTextInput from "components/common/input/dto_input/dto-text-input";
import anchoreIntegratorConnectionMetadata from "./anchore-integrator-connection-metadata";
import toolsActions from "../../../tools-actions";
import {AuthContext} from "../../../../../../contexts/AuthContext";

function AnchoreIntegratorToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [anchoreIntegratorConfigurationDto, setAnchoreIntegratorConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setAnchoreIntegratorConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), anchoreIntegratorConnectionMetadata));
  };

  const saveAnchoreToolConfiguration = async () => {
      let newConfiguration = anchoreIntegratorConfigurationDto.getPersistData();
      newConfiguration.accountPassword = toolsActions.savePasswordToVault(toolData, "accountPassword", newConfiguration.accountPassword, getAccessToken);
      const item = { configuration: newConfiguration };
      return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={anchoreIntegratorConfigurationDto}
      persistRecord={saveAnchoreToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"Anchore"}
    >
      <Row>
        <Col sm={12}>
          <DtoTextInput dataObject={anchoreIntegratorConfigurationDto} setDataObject={setAnchoreIntegratorConfigurationDto} fieldName={"toolURL"} />
          <DtoTextInput dataObject={anchoreIntegratorConfigurationDto} setDataObject={setAnchoreIntegratorConfigurationDto} fieldName={"accountUsername"} />
          <DtoTextInput type={"password"} dataObject={anchoreIntegratorConfigurationDto} setDataObject={setAnchoreIntegratorConfigurationDto} fieldName={"accountPassword"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

AnchoreIntegratorToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default AnchoreIntegratorToolConfiguration;
