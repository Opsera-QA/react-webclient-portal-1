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
import BlackduckMetadata from "./blackduck-tool-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

const BlackduckToolConfiguration = ({ toolData }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [blackDuckConfigurationModel, setBlackDuckConfigurationModel] = useState(undefined);
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
    setBlackDuckConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), BlackduckMetadata));
  };

  const saveBlackduckToolConfiguration = async () => {
    const newConfiguration = blackDuckConfigurationModel.getPersistData();
    newConfiguration.token = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "token",
      newConfiguration?.token
    );
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  if (blackDuckConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={blackDuckConfigurationModel}
      setModel={setBlackDuckConfigurationModel}
      persistRecord={saveBlackduckToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK}
    >
      <Row>
        <Col sm={12}>          
          <TextInputBase
            dataObject={blackDuckConfigurationModel}
            setDataObject={setBlackDuckConfigurationModel}
            fieldName={"url"}
          />
          <VaultTextInput
            dataObject={blackDuckConfigurationModel}
            setDataObject={setBlackDuckConfigurationModel}
            fieldName={"token"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
};

BlackduckToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default BlackduckToolConfiguration;
