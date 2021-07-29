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

function CoverityToolConfiguration({ toolData }) {
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
    newConfiguration.coverityPassword = await toolsActions.savePasswordToVault(toolData, coverityConfigurationDto, "coverityPassword", newConfiguration.coverityPassword, getAccessToken);

    const item = {configuration: newConfiguration};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };
  
  return (
    <ToolConfigurationEditorPanelContainer
      recordDto={coverityConfigurationDto}
      persistRecord={saveCoverityConfigurationDto}
      toolData={toolData}
      toolConnectionCheckName={"coverity"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={coverityConfigurationDto} setDataObject={setCoverityConfigurationDto} fieldName={"coverityUrl"} />
          <TextInputBase dataObject={coverityConfigurationDto} setDataObject={setCoverityConfigurationDto} fieldName={"coverityUsername"} />
          <VaultTextInput dataObject={coverityConfigurationDto} setDataObject={setCoverityConfigurationDto} fieldName={"coverityPassword"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}
CoverityToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default CoverityToolConfiguration;
