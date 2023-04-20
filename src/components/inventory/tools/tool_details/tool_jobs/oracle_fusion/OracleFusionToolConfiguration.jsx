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
import OracleFusionMetadata from "./oracleFusion-tool-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

const OracleFusionToolConfiguration = ({ toolData, setUpMode, setCurrentScreen }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [oracleFusionConfigurationModel, setOracleFusionConfigurationModel] = useState(undefined);
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
    setOracleFusionConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), OracleFusionMetadata));
  };

  const saveOracleFusionToolConfiguration = async () => {
    const newConfiguration = oracleFusionConfigurationModel.getPersistData();
    newConfiguration.accountPassword = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "accountPassword",
      newConfiguration?.accountPassword
    );
    await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
    if (setUpMode === "wizard") setCurrentScreen("connection_test");
  };

  if (oracleFusionConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={oracleFusionConfigurationModel}
      setModel={setOracleFusionConfigurationModel}
      persistRecord={saveOracleFusionToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.ORACLE_FUSION}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>          
          <TextInputBase
            dataObject={oracleFusionConfigurationModel}
            setDataObject={setOracleFusionConfigurationModel}
            fieldName={"toolURL"}
          />
          <TextInputBase
            dataObject={oracleFusionConfigurationModel}
            setDataObject={setOracleFusionConfigurationModel}
            fieldName={"accountUsername"}
          />
          <VaultTextInput
            dataObject={oracleFusionConfigurationModel}
            setDataObject={setOracleFusionConfigurationModel}
            fieldName={"accountPassword"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
};

OracleFusionToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default OracleFusionToolConfiguration;
