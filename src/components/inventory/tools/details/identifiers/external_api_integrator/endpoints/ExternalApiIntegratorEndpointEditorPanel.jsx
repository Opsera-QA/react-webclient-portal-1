import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import StandaloneDeleteButtonWithConfirmationModal
  from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";
import EndpointRequestTypeSelectInput
  from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/EndpointRequestTypeSelectInput";
import ExternalApiIntegratorEndpointParametersVerticalTabContainer
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointParametersVerticalTabContainer";
import EndpointTypeSelectInput
  from "components/common/list_of_values_input/inventory/endpoints/type/EndpointTypeSelectInput";

function ExternalApiIntegratorEndpointEditorPanel(
  {
    toolId,
    externalApiIntegratorModel,
    setExternalApiIntegratorModel,
    closePanelFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createEndpoint = async () => {
    const response = await externalApiIntegratorEndpointsActions.createExternalApiIntegratorEndpointV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      externalApiIntegratorModel,
    );

    if (closePanelFunction) {
      closePanelFunction();
    }

    return response;
  };

  const updateEndpoint = async () => {
    const response = await externalApiIntegratorEndpointsActions.updateExternalApiIntegratorEndpointV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      externalApiIntegratorModel,
    );

    if (closePanelFunction) {
      closePanelFunction();
    }

    return response;
  };

  const deleteEndpoint = async () => {
    const response = await externalApiIntegratorEndpointsActions.deleteExternalApiIntegratorEndpointV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      externalApiIntegratorModel?.getMongoDbId(),
    );

    if (closePanelFunction) {
      closePanelFunction();
    }

    return response;
  };

  const getDeleteButton = () => {
    return (
      <StandaloneDeleteButtonWithConfirmationModal
        model={externalApiIntegratorModel}
        deleteDataFunction={deleteEndpoint}
      />
    );
  };

  if (externalApiIntegratorModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <EditorPanelContainer
      recordDto={externalApiIntegratorModel}
      createRecord={createEndpoint}
      updateRecord={updateEndpoint}
      handleClose={closePanelFunction}
      extraButtons={getDeleteButton()}
      className={"mx-2 mt-2"}
    >
      <Row>
        <Col lg={8} sm={6}>
          <TextInputBase
            fieldName={"name"}
            dataObject={externalApiIntegratorModel}
            setDataObject={setExternalApiIntegratorModel}
          />
        </Col>
        <Col lg={4} sm={6}>
          <EndpointTypeSelectInput
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
          />
        </Col>
        <Col xs={12} sm={2}>
          <EndpointRequestTypeSelectInput
            fieldName={"requestType"}
            model={externalApiIntegratorModel}
            setModel={setExternalApiIntegratorModel}
          />
        </Col>
        <Col xs={12} sm={10}>
          <TextInputBase
            fieldName={"url"}
            dataObject={externalApiIntegratorModel}
            setDataObject={setExternalApiIntegratorModel}
          />
        </Col>
        <Col lg={12}>
          <ExternalApiIntegratorEndpointParametersVerticalTabContainer
            externalApiIntegratorModel={externalApiIntegratorModel}
            setExternalApiIntegratorModel={setExternalApiIntegratorModel}
            toolId={toolId}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            fieldName={"description"}
            dataObject={externalApiIntegratorModel}
            setDataObject={setExternalApiIntegratorModel}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ExternalApiIntegratorEndpointEditorPanel.propTypes = {
  toolId: PropTypes.string,
  externalApiIntegratorModel: PropTypes.object,
  setExternalApiIntegratorModel: PropTypes.func,
  closePanelFunction: PropTypes.func,
};

export default ExternalApiIntegratorEndpointEditorPanel;
