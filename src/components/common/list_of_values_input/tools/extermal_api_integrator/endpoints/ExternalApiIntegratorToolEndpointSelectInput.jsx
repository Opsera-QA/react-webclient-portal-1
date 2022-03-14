import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";
import externalApiIntegratorEndpointsActions
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoints.actions";

function ExternalApiIntegratorToolEndpointSelectInput(
  {
    fieldName,
    model,
    setModel,
    toolId,
    disabled,
    setDataFunction,
    clearDataFunction,
    valueField,
    textField,
  }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [endpoints, setEndpoints] = useState([]);
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
    setEndpoints([]);

    if (isMongoDbId(toolId) === true) {
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
    const response = await externalApiIntegratorEndpointsActions.getExternalApiIntegratorEndpointsV2(
      getAccessToken,
      cancelSource,
      toolId,
    );
    const endpointList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(endpointList)) {
      setEndpoints([...endpointList]);
      const selectedEndpointId = model?.getData(fieldName);

      if (hasStringValue(selectedEndpointId) === true) {
        const foundEndpoint = endpoints.find((repository) => repository[valueField] === selectedEndpointId);

        if (foundEndpoint == null) {
          setError(
            "Previously saved Endpoint is no longer available. It may have been deleted. Please select another Endpoint from the list."
          );
        }
      }
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={endpoints}
      busy={isLoading}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      error={error}
    />
  );
}

ExternalApiIntegratorToolEndpointSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  toolId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

ExternalApiIntegratorToolEndpointSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default ExternalApiIntegratorToolEndpointSelectInput;
