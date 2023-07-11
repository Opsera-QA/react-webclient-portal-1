import React, {useState, useEffect, useContext, useRef} from "react";
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
import axios from "axios";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import toolIdentifierConnectionCheckConstants
from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function TerraformCloudToolConfiguration({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [terraformCloudConfigurationDto, setTerraformCloudConfigurationDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setTerraformCloudConfigurationDto(modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), TerraformCloudMetadata));
  };

  const saveTerraformCloudToolConfiguration = async () => {
    const newConfiguration = terraformCloudConfigurationDto.getPersistData();
    newConfiguration.token = await toolsActions.saveThreePartToolPasswordToVaultV2(getAccessToken, cancelTokenSource, toolData, terraformCloudConfigurationDto, "token", newConfiguration.token);
    await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
    if (setUpMode === "wizard") setCurrentScreen("tool_detail");
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={terraformCloudConfigurationDto}
      setModel={setTerraformCloudConfigurationDto}
      persistRecord={saveTerraformCloudToolConfiguration}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.TERRAFORM_CLOUD}
      toolData={toolData}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase dataObject={terraformCloudConfigurationDto} setDataObject={setTerraformCloudConfigurationDto} fieldName={"url"}/>
          <VaultTextAreaInput dataObject={terraformCloudConfigurationDto} setDataObject={setTerraformCloudConfigurationDto} fieldName={"token"}/>
          <BooleanToggleInput dataObject={terraformCloudConfigurationDto} setDataObject={setTerraformCloudConfigurationDto} fieldName={"terraformEnterpriseFlag"} />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

TerraformCloudToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default TerraformCloudToolConfiguration;