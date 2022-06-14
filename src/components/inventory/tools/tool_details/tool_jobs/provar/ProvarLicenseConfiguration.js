import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import provarConnectionMetadata from "./provar-connection-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import ProvarLicenseTypeSelectInput from "./ProvarLicenseTypeSelectInput";
import VaultTextAreaInput from "../../../../../common/inputs/text/VaultTextAreaInput";

function ProvarLicenseConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [provarConfigurationDto, setProvarConfigurationDto] =
    useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setProvarConfigurationDto(
      modelHelpers.getToolConfigurationModel(
        toolData.getData("configuration"),
        provarConnectionMetadata,
      ),
    );
  };

  const saveProvarLicenseConfiguration = async () => {
    let newConfiguration = provarConfigurationDto.getPersistData();
    newConfiguration.licenseKey = await toolsActions.savePasswordToVault(
      toolData,
      provarConfigurationDto,
      "licenseKey",
      newConfiguration.licenseKey,
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
      model={provarConfigurationDto}
      setModel={setProvarConfigurationDto}
      persistRecord={saveProvarLicenseConfiguration}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <ProvarLicenseTypeSelectInput
            dataObject={provarConfigurationDto}
            setDataObject={setProvarConfigurationDto}
          />
          <VaultTextAreaInput
            dataObject={provarConfigurationDto}
            setDataObject={setProvarConfigurationDto}
            fieldName={"licenseKey"}
            disabled={
              provarConfigurationDto?.getData("licenseType")?.length === 0
            }
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ProvarLicenseConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
};

export default ProvarLicenseConfiguration;
