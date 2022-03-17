import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import FlywayDatabaseTypeSelectInput from "components/common/list_of_values_input/tools/flyway_database/FlywayDatabaseTypeSelectInput";
import axios from "axios";
import {
  flywayDatabaseToolConnectionMetadata
} from "components/inventory/tools/details/identifiers/flyway_database/flywayDatabaseToolConnection.metadata";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";

function FlywayDatabaseToolConnectionEditorPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [flywayConfigurationModel, setFlywayConfigurationModel] = useState(undefined);
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
    setFlywayConfigurationModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), flywayDatabaseToolConnectionMetadata));
  };

  const saveFlywayToolConfiguration = async () => {
    const newConfiguration = flywayConfigurationModel.getPersistData();
    newConfiguration.password = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolData?.getMongoDbId(),
      toolData.getData("identifier"),
      "password",
      newConfiguration?.password
    );

    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData,newConfiguration);
  };

  const getDynamicFields = () => {
    if (flywayConfigurationModel?.getData("buildType") === "oracle") {
      return (
        <TextInputBase
          dataObject={flywayConfigurationModel}
          setDataObject={setFlywayConfigurationModel}
          fieldName={"service"}
        />
      );
    }
  };

  if (flywayConfigurationModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={flywayConfigurationModel}
      setModel={setFlywayConfigurationModel}
      persistRecord={saveFlywayToolConfiguration}
      toolData={toolData}
      toolConnectionCheckName={toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR}
    >
      <Row>
        <Col sm={12}>
          <FlywayDatabaseTypeSelectInput
            model={flywayConfigurationModel}
            setModel={setFlywayConfigurationModel}
            fieldName={"buildType"}
          />
          <TextInputBase
            dataObject={flywayConfigurationModel}
            setDataObject={setFlywayConfigurationModel}
            fieldName={"url"}
          />
          <TextInputBase
            dataObject={flywayConfigurationModel}
            setDataObject={setFlywayConfigurationModel}
            fieldName={"port"}
          />
          <TextInputBase
            dataObject={flywayConfigurationModel}
            setDataObject={setFlywayConfigurationModel}
            fieldName={"userName"}
          />
          <VaultTextInput
            dataObject={flywayConfigurationModel}
            setDataObject={setFlywayConfigurationModel}
            fieldName={"password"}
          />
          {getDynamicFields()}
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

FlywayDatabaseToolConnectionEditorPanel.propTypes = {
  toolData: PropTypes.object,
};

export default FlywayDatabaseToolConnectionEditorPanel;