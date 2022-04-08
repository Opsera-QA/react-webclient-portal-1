import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import ToolConfigurationEditorPanelContainer from "components/common/panels/detail_panel_container/tools/ToolConfigurationEditorPanelContainer";
import Row from "react-bootstrap/Row";
import toolsActions from "components/inventory/tools/tools-actions";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import axios from "axios";
import { externalApiIntegratorToolConnectionMetadata } from "components/inventory/tools/details/identifiers/external_api_integrator/connection/externalApiIntegratorToolConnection.metadata";
import ExternalApiIntegratorConnectionCheckUrlTextInput from "components/inventory/tools/details/identifiers/external_api_integrator/connection/inputs/connection_check/ExternalApiIntegratorConnectionCheckUrlTextInput";

function ExternalApiIntegratorToolConnectionEditorPanel({ toolModel, setToolModel }) {
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
    setExternalApiConnectionModel(
      modelHelpers.parseObjectIntoModel(
        toolModel?.getData("configuration"),
        externalApiIntegratorToolConnectionMetadata,
      ),
    );
  };

  const saveToolConnectionDetails = async () => {
    const newConfiguration = externalApiConnectionModel.getPersistData();
    const response = await toolsActions.updateToolConnectionDetails(
      getAccessToken,
      cancelTokenSource,
      toolModel?.getMongoDbId(),
      newConfiguration,
    );
    toolModel?.setData("configuration", newConfiguration);
    setToolModel({...toolModel});
    return response;
  };

  if (externalApiConnectionModel == null) {
    return null;
  }

  return (
    <ToolConfigurationEditorPanelContainer
      model={externalApiConnectionModel}
      setModel={setExternalApiConnectionModel}
      persistRecord={saveToolConnectionDetails}
      toolData={toolModel}
    >
      <Row>
        <Col sm={12}>
          <ExternalApiIntegratorConnectionCheckUrlTextInput
            model={externalApiConnectionModel}
            setModel={setExternalApiConnectionModel}
            fieldName={"connection_check_url"}
          />
        </Col>
      </Row>
    </ToolConfigurationEditorPanelContainer>
  );
}

ExternalApiIntegratorToolConnectionEditorPanel.propTypes = {
  toolModel: PropTypes.object,
  setToolModel: PropTypes.func,
};

export default ExternalApiIntegratorToolConnectionEditorPanel;
