import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";
import {
  ENDPOINT_REQUEST_TYPES
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";
import EndpointRequestParametersInputBase
  from "components/common/inputs/endpoints/endpoint/request/parameters/EndpointRequestParametersInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestParametersMetadata
} from "components/common/inputs/endpoints/endpoint/request/parameters/endpointRequestParameters.metadata";
import InfoText from "components/common/inputs/info_text/InfoText";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

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
  const [endpointRequestParametersModel, setEndpointRequestParametersModel] = useState(undefined);
  const isMounted = useRef(false);
  const {getAccessToken} = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    isMounted.current = true;
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setEndpoint(undefined);

    if (isMongoDbId(toolId) === true && isMongoDbId(endpointId) === true) {
      setEndpointRequestParametersModel(modelHelpers.parseObjectIntoModel(model?.getData(fieldName), endpointRequestParametersMetadata));

      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId, endpointId]);

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

  const setModelFunction = (updatedModel) => {
    const newModel = {...model};
    newModel.setData(fieldName, updatedModel.getPersistData());
    setModel({...newModel});
    setEndpointRequestParametersModel({...updatedModel});
  };

  const getDynamicInputsForRequestType = () => {
    switch (endpoint?.requestType) {
      case ENDPOINT_REQUEST_TYPES.GET:
        return (
          <EndpointRequestParametersInputBase
            model={endpointRequestParametersModel}
            setModel={setModelFunction}
            parameterFields={endpoint?.queryParameterFields}
            fieldName={"queryParameters"}
          />
        );
      case ENDPOINT_REQUEST_TYPES.PUT:
        return (
          <EndpointRequestParametersInputBase
            model={endpointRequestParametersModel}
            setModel={setModelFunction}
            parameterFields={endpoint?.requestBodyFields}
            fieldName={"requestBody"}
          />
        );
      case ENDPOINT_REQUEST_TYPES.POST:
        return (
          <>
            <EndpointRequestParametersInputBase
              model={endpointRequestParametersModel}
              setModel={setModelFunction}
              parameterFields={endpoint?.queryParameterFields}
              fieldName={"queryParameters"}
            />
            <EndpointRequestParametersInputBase
              model={endpointRequestParametersModel}
              setModel={setModelFunction}
              parameterFields={endpoint?.requestBodyFields}
              fieldName={"requestBody"}
            />
          </>
        );
    }
  };

  if (endpoint == null) {
    return null;
  }

  return (
    <div>
      <H5FieldSubHeader
        subheaderText={"Endpoint Parameters"}
      />
      <InfoText errorMessage={error} />
      {getDynamicInputsForRequestType()}
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