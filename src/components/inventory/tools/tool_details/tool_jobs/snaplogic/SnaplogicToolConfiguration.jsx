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
import SnaplogicMetadata from "./snaplogic-tool-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

const SnaplogicToolConfiguration = ({ toolData }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [snaplogicConfigurationModel, setSnaplogicConfigurationModel] = useState(undefined);
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
    setSnaplogicConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), SnaplogicMetadata));
  };

  const saveSnaplogicToolConfiguration = async () => {
    const newConfiguration = snaplogicConfigurationModel.getPersistData();
    newConfiguration.accountPassword = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "accountPassword",
      newConfiguration?.accountPassword
    );

    newConfiguration.metaSnapToken = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "metaSnapToken",
      newConfiguration?.metaSnapToken
    );

    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  if (snaplogicConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={snaplogicConfigurationModel}
      setModel={setSnaplogicConfigurationModel}
      persistRecord={saveSnaplogicToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC}
    >
      <Row>
        <Col sm={12}>          
          <TextInputBase
            dataObject={snaplogicConfigurationModel}
            setDataObject={setSnaplogicConfigurationModel}
            fieldName={"organization"}
          />
          <TextInputBase
            dataObject={snaplogicConfigurationModel}
            setDataObject={setSnaplogicConfigurationModel}
            fieldName={"accountUsername"}
          />
          <VaultTextInput
            dataObject={snaplogicConfigurationModel}
            setDataObject={setSnaplogicConfigurationModel}
            fieldName={"accountPassword"}
          />
          <TextInputBase
            dataObject={snaplogicConfigurationModel}
            setDataObject={setSnaplogicConfigurationModel}
            fieldName={"metaSnapURL"}
          />
          <VaultTextInput
            dataObject={snaplogicConfigurationModel}
            setDataObject={setSnaplogicConfigurationModel}
            fieldName={"metaSnapToken"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
};

SnaplogicToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default SnaplogicToolConfiguration;
