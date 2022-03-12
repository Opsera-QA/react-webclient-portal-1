import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer
  from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import axios from "axios";
import {
  externalApiIntegratorToolConnectionMetadata
} from "components/inventory/tools/details/identifiers/external_api_integrator/connection/externalApiIntegratorToolConnection.metadata";

function ExternalApiIntegratorToolConnectionEditorPanel({ toolData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [externalApiConnectionModel, setExternalApiConnectionModel] = useState(undefined);
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
    setExternalApiConnectionModel(modelHelpers.parseObjectIntoModel(toolData?.getData("configuration"), externalApiIntegratorToolConnectionMetadata));
  };

  // TODO: Make route that just takes the connection body and updates inside the tool after checking RBAC-- If anything is saved in vault, do it there.
  const saveToolConnectionDetails = async () => {
    const newConfiguration = externalApiConnectionModel.getPersistData();
    // newConfiguration.password = await toolsActions.saveThreePartToolPasswordToVaultV3(getAccessToken, cancelTokenSource,toolData, flywayConfigurationModel, "password", newConfiguration?.password);
    return await toolsActions.saveToolConfigurationV2(getAccessToken, cancelTokenSource, toolData,newConfiguration);
  };

  if (externalApiConnectionModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={externalApiConnectionModel}
      setModel={setExternalApiConnectionModel}
      persistRecord={saveToolConnectionDetails}
      toolData={toolData}
    >
      <Row>
        <Col sm={12}>
          <TextInputBase
            dataObject={externalApiConnectionModel}
            setDataObject={setExternalApiConnectionModel}
            fieldName={"connection_check_url"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ExternalApiIntegratorToolConnectionEditorPanel.propTypes = {
  toolData: PropTypes.object,
};

export default ExternalApiIntegratorToolConnectionEditorPanel;