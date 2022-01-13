import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import TerraformCloudMetadata from "./terraform-cloud-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";

function TerraformCloudToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [terraformCloudConfigurationDto, setTerraformCloudConfigurationDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setTerraformCloudConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), TerraformCloudMetadata));
  };

  const saveTerraformCloudToolConfiguration = async () => {
    const item = {configuration: terraformCloudConfigurationDto.getPersistData()};
    return await toolsActions.saveToolConfiguration(toolData, item, getAccessToken);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={terraformCloudConfigurationDto}
      setModel={setTerraformCloudConfigurationDto}
      persistRecord={saveTerraformCloudToolConfiguration}
      toolData={toolData}
      // toolConnectionCheckName={"azure"}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={terraformCloudConfigurationDto} setDataObject={setTerraformCloudConfigurationDto} fieldName={"terraformCloudUrl"}/>
          <VaultTextAreaInput dataObject={terraformCloudConfigurationDto} setDataObject={setTerraformCloudConfigurationDto} fieldName={"terraformToken"}/>
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

TerraformCloudToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default TerraformCloudToolConfiguration;