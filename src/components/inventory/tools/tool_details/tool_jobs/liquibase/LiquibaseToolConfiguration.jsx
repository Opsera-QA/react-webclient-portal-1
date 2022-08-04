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
import LiquibaseMetadata from "./liquibase-tool-metadata";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import LiquibaseDatabaseTypeSelectInput from "./inputs/LiquibaseDatabaseTypeSelectInput";

const LiquibaseToolConfiguration = ({ toolData }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [liquibaseConfigurationModel, setLiquibaseConfigurationModel] = useState(undefined);
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
    setLiquibaseConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), LiquibaseMetadata));
  };

  const saveLiquibaseToolConfiguration = async () => {
    const newConfiguration = liquibaseConfigurationModel.getPersistData();
    newConfiguration.accountPassword = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("tool_identifier"),
      "accountPassword",
      newConfiguration?.accountPassword
    );
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData, newConfiguration);
  };

  if (liquibaseConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={liquibaseConfigurationModel}
      setModel={setLiquibaseConfigurationModel}
      persistRecord={saveLiquibaseToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.LIQUIBASE}
    >
      <Row>
        <Col sm={12}>
          <LiquibaseDatabaseTypeSelectInput 
            model={liquibaseConfigurationModel}
            setModel={setLiquibaseConfigurationModel}
          />
          <TextInputBase
            dataObject={liquibaseConfigurationModel}
            setDataObject={setLiquibaseConfigurationModel}
            fieldName={"url"}
          />
          <TextInputBase
            dataObject={liquibaseConfigurationModel}
            setDataObject={setLiquibaseConfigurationModel}
            fieldName={"port"}
          />
          <TextInputBase
            dataObject={liquibaseConfigurationModel}
            setDataObject={setLiquibaseConfigurationModel}
            fieldName={"accountUsername"}
          />
          <VaultTextInput
            dataObject={liquibaseConfigurationModel}
            setDataObject={setLiquibaseConfigurationModel}
            fieldName={"accountPassword"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
};

LiquibaseToolConfiguration.propTypes = {
  toolData: PropTypes.object,
};

export default LiquibaseToolConfiguration;
