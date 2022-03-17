import React, {useContext, useEffect, useRef, useState} from "react";
import ExternalApiIntegratorEndpointsTable from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointsTable";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ExternalApiIntegratorEndpointEditorPanel
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointEditorPanel";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import toolEndpointsMetadata from "components/inventory/tools/details/endpoints/toolEndpoints.metadata";

function ExternalApiIntegratorEndpointsPanel({ toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [endpoints, setEndpoints] = useState([]);
  const [externalApiIntegratorModel, setExternalApiIntegratorModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setEndpoints([]);
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMongoDbId(toolId) === true) {
        await getEndpoints(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getEndpoints = async (cancelSource = cancelTokenSource) => {
    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointsV2(getAccessToken, cancelSource, toolId);
    const endpointList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(endpointList)) {
      setEndpoints(endpointList);
    }
  };

  const handleRowSelectFunction = (rowData) => {
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, toolEndpointsMetadata);
    setExternalApiIntegratorModel({...parsedModel});
  };

  const closePanelFunction = async () => {
    setExternalApiIntegratorModel(null);
    await loadData();
  };

  if (externalApiIntegratorModel != null) {
    return (
      <ExternalApiIntegratorEndpointEditorPanel
        closePanelFunction={closePanelFunction}
        externalApiIntegratorModel={externalApiIntegratorModel}
        setExternalApiIntegratorModel={setExternalApiIntegratorModel}
        toolId={toolId}
        loadData={loadData}
      />
    );
  }

  return (
    <ExternalApiIntegratorEndpointsTable
      isLoading={isLoading}
      endpoints={endpoints}
      toolId={toolId}
      loadData={loadData}
      handleRowSelectFunction={handleRowSelectFunction}
    />
  );
}

ExternalApiIntegratorEndpointsPanel.propTypes = {
  toolId: PropTypes.string,
};

export default ExternalApiIntegratorEndpointsPanel;
