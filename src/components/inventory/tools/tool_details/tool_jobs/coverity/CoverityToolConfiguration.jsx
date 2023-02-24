import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import CoverityConnectionMetadata from "./coverity-connection-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import FileReaderInputBase from "components/common/inputs/file/FileReaderInputBase";

function CoverityToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [coverityConfigurationDto, setCoverityConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setCoverityConfigurationDto(
      modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), CoverityConnectionMetadata)
    );
  };

  const saveCoverityConfigurationDto = async () => {
    let newConfiguration = coverityConfigurationDto.getPersistData();
    newConfiguration.accountPassword = await toolsActions.savePasswordToVault(toolData, coverityConfigurationDto, "accountPassword", newConfiguration.accountPassword, getAccessToken);
    newConfiguration.license = await toolsActions.savePasswordToVault(toolData, coverityConfigurationDto, "license", newConfiguration.license, getAccessToken);

    const item = {configuration: newConfiguration};
    await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={coverityConfigurationDto}
      setModel={setCoverityConfigurationDto}
      persistRecord={saveCoverityConfigurationDto}
      toolData={toolData}
      toolConnectionCheckName={"coverity"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={coverityConfigurationDto} setDataObject={setCoverityConfigurationDto} fieldName={"toolURL"} />
          <TextInputBase dataObject={coverityConfigurationDto} setDataObject={setCoverityConfigurationDto} fieldName={"accountUsername"} />
          <VaultTextInput dataObject={coverityConfigurationDto} setDataObject={setCoverityConfigurationDto} fieldName={"accountPassword"}/>
          <FileReaderInputBase model={coverityConfigurationDto} setModel={setCoverityConfigurationDto} acceptType={".dat,.xml"} fieldName={"license"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}
CoverityToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default CoverityToolConfiguration;
