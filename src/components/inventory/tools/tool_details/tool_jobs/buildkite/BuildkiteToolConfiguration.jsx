import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import BuildkiteMetadata from "./buildkite-tool-metadata";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import VaultTextAreaInput from "components/common/inputs/text/VaultTextAreaInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import axios from "axios";

function BuildkiteToolConfiguration({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [buildkiteConfigurationDto, setBuildkiteConfigurationDto] = useState(undefined);
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
    setBuildkiteConfigurationDto(
      modelHelpers.getToolConfigurationModel(toolData.getData("configuration"), BuildkiteMetadata)
    );
  };

  const saveBuildkiteToolConfiguration = async () => {
    const newConfiguration = buildkiteConfigurationDto.getPersistData();
    newConfiguration.publicKey = await toolsActions.saveThreePartToolPasswordToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolData,
      buildkiteConfigurationDto,
      "publicKey",
      newConfiguration.publicKey
    );
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  return (
    <ToolConfigurationEditorPanelContainer
      model={buildkiteConfigurationDto}
      setModel={setBuildkiteConfigurationDto}
      persistRecord={saveBuildkiteToolConfiguration}
      // toolConnectionCheckName={"buildkite"}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase
            dataObject={buildkiteConfigurationDto}
            setDataObject={setBuildkiteConfigurationDto}
            fieldName={"url"}
          />
          <TextInputBase
            dataObject={buildkiteConfigurationDto}
            setDataObject={setBuildkiteConfigurationDto}
            fieldName={"organizationName"}
          />
          <TextInputBase
            dataObject={buildkiteConfigurationDto}
            setDataObject={setBuildkiteConfigurationDto}
            fieldName={"slug"}
          />
          <VaultTextAreaInput
            dataObject={buildkiteConfigurationDto}
            setDataObject={setBuildkiteConfigurationDto}
            fieldName={"publicKey"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

BuildkiteToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
  saveToolConfiguration: PropTypes.func,
  fnSaveToVault: PropTypes.func,
};

export default BuildkiteToolConfiguration;
