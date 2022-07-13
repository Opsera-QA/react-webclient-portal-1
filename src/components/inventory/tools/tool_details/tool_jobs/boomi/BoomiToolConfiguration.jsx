import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import BoomiConnectionMetadata from "./boomi-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ApiTypeSelectInput from "./inputs/ApiTypeSelectInput";

function BoomiToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [boomiConfigurationDto, setBoomiConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setBoomiConfigurationDto(
      modelHelpers.getToolConfigurationModel(
        toolData.getData("configuration"),
        BoomiConnectionMetadata,
      ),
    );
  };

  const saveBoomiToolConfiguration = async () => {
    let newConfiguration = boomiConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(
      toolData,
      boomiConfigurationDto,
      "accountPassword",
      newConfiguration.accountPassword,
      getAccessToken,
    );

    const item = { configuration: newConfiguration };
    return await toolsActions.saveToolConfiguration(
      toolData,
      item,
      getAccessToken,
    );
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={boomiConfigurationDto}
      setModel={setBoomiConfigurationDto}
      persistRecord={saveBoomiToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={"boomi"}
    >
      <Row>
        <Col sm={12}>
          <ApiTypeSelectInput
            dataObject={boomiConfigurationDto}
            setDataObject={setBoomiConfigurationDto}
          />
          {boomiConfigurationDto?.getData("apiType") === "custom" && (
            <TextInputBase
              dataObject={boomiConfigurationDto}
              setDataObject={setBoomiConfigurationDto}
              fieldName={"toolURL"}
            />
          )}
          {boomiConfigurationDto?.getData("apiType") === "native" && (
            <TextInputBase
              dataObject={boomiConfigurationDto}
              setDataObject={setBoomiConfigurationDto}
              fieldName={"accountId"}
            />
          )}
          <TextInputBase
            dataObject={boomiConfigurationDto}
            setDataObject={setBoomiConfigurationDto}
            fieldName={"accountUsername"}
          />
          <VaultTextInput
            dataObject={boomiConfigurationDto}
            setDataObject={setBoomiConfigurationDto}
            fieldName={"accountPassword"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

BoomiToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
};

export default BoomiToolConfiguration;
