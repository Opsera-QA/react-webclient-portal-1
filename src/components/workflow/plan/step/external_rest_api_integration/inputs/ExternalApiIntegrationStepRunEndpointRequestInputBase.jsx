import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";

// TODO: Make generic and put in common even though this will probably not be reused.
function ExternalApiIntegrationStepRunEndpointRequestInputBase(
  {
    model,
    setModel,
    fieldName,
    toolId,
    endpointId,
    disabled,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [endpoint, setEndpoint] = useState(undefined);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setEndpoint([]);

    if (isMongoDbId(toolId) === true && isMongoDbId(endpointId) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setError(undefined);
      setIsLoading(true);
      await loadExternalApiIntegratorEndpoints(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadExternalApiIntegratorEndpoints = async (cancelSource = cancelTokenSource) => {
    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointByIdV2(
      getAccessToken,
      cancelSource,
      toolId,
      endpointId,
    );
    const newEndpoint = response?.data?.data;

    if (isMounted?.current === true && newEndpoint) {
      setEndpoint(newEndpoint);
    }
  };

  return (
    <div>
      {JSON.stringify(endpoint)}
    </div>
  );
}

ExternalApiIntegrationStepRunEndpointRequestInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ExternalApiIntegrationStepRunEndpointRequestInputBase;