import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import {
  apigeeToolConnectionMetadata
} from "components/inventory/tools/details/identifiers/apigee/apigeeToolConnection.metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import ApigeeVersionSelectInput from "components/common/list_of_values_input/tools/apigee/ApigeeVersionSelectInput";
import toolIdentifierConnectionCheckConstants
  from "@opsera/definitions/constants/tool_identifiers/connection/toolIdentifierConnectionCheck.constants";

function ApigeeToolConnectionEditorPanel({ toolData, setUpMode, setCurrentScreen }) {
  const { getAccessToken } = useContext(AuthContext);
  const [apigeeConfigurationModel, setApigeeConfigurationModel] = useState(undefined);
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
    setApigeeConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), apigeeToolConnectionMetadata));
  };

  const saveApigeeToolConfiguration = async () => {
    const newConfiguration = apigeeConfigurationModel.getPersistData();
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

  if (apigeeConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={apigeeConfigurationModel}
      setModel={setApigeeConfigurationModel}
      persistRecord={saveApigeeToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConnectionCheckConstants.TOOL_CONNECTION_CHECK_NAMES.APIGEE}
      setUpMode={setUpMode}
    >
      <Row>
        <Col sm={12}>
          <ApigeeVersionSelectInput
            model={apigeeConfigurationModel}
            setModel={setApigeeConfigurationModel}
            fieldName={"version"}
          />
          <TextInputBase
            dataObject={apigeeConfigurationModel}
            setDataObject={setApigeeConfigurationModel}
            fieldName={"zoneId"}
          />
          <TextInputBase
            dataObject={apigeeConfigurationModel}
            setDataObject={setApigeeConfigurationModel}
            fieldName={"accountUsername"}
          />
          <VaultTextInput
            dataObject={apigeeConfigurationModel}
            setDataObject={setApigeeConfigurationModel}
            fieldName={"accountPassword"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ApigeeToolConnectionEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setUpMode: PropTypes.string,
  setCurrentScreen: PropTypes.func
};

export default ApigeeToolConnectionEditorPanel;
