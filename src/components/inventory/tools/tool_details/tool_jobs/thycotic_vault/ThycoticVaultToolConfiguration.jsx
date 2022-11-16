import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import axios from "axios";
import ThycoticVaultMetadata from "./thycoticVault-tool-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import ThycoticVaultTypeSelectInput from "./inputs/ThycoticVaultTypeSelectInput";
import ThycoticVaultDomainSelectInput from "./inputs/ThycoticVaultDomainSelectInput";

const ThycoticVaultToolConfiguration = ({ toolData }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [thycoticVaultConfigurationModel, setThycoticVaultConfigurationModel] = useState(undefined);
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
    setThycoticVaultConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), ThycoticVaultMetadata));
  };

  const saveThycoticVaultToolConfiguration = async () => {
    const newConfiguration = thycoticVaultConfigurationModel.getPersistData();
    newConfiguration.clientId = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "clientId",
      newConfiguration?.clientId
    );
    newConfiguration.clientSecret = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "clientSecret",
      newConfiguration?.clientSecret
    );
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  if (thycoticVaultConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={thycoticVaultConfigurationModel}
      setModel={setThycoticVaultConfigurationModel}
      persistRecord={saveThycoticVaultToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.THYCOTIC_VAULT}
    >
      <Row>
        <Col sm={12}>          
          <TextInputBase
            dataObject={thycoticVaultConfigurationModel}
            setDataObject={setThycoticVaultConfigurationModel}
            fieldName={"tenantName"}
          />
          <ThycoticVaultDomainSelectInput 
            model={thycoticVaultConfigurationModel}
            setModel={setThycoticVaultConfigurationModel}
          />
          <VaultTextInput
            dataObject={thycoticVaultConfigurationModel}
            setDataObject={setThycoticVaultConfigurationModel}
            fieldName={"clientId"}
          />
          <VaultTextInput
            dataObject={thycoticVaultConfigurationModel}
            setDataObject={setThycoticVaultConfigurationModel}
            fieldName={"clientSecret"}
          />
          <TextInputBase
            dataObject={thycoticVaultConfigurationModel}
            setDataObject={setThycoticVaultConfigurationModel}
            fieldName={"vaultPath"}
          />
          <ThycoticVaultTypeSelectInput 
            model={thycoticVaultConfigurationModel}
            setModel={setThycoticVaultConfigurationModel}
          />          
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
};

ThycoticVaultToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default ThycoticVaultToolConfiguration;
