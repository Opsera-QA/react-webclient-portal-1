import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ENDPOINT_REQUEST_TYPES,
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";
import EndpointRequestParametersInputBase
  from "components/common/inputs/endpoints/endpoint/request/parameters/EndpointRequestParametersInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestParametersMetadata,
} from "components/common/inputs/endpoints/endpoint/request/parameters/endpointRequestParameters.metadata";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

function EndpointApiConfigurationInputBase(
  {
    model,
    setModel,
    endpoint,
    fieldName,
    disabled,
    isLoading,
    height,
    endpointParameterArrayInputHeight,
    endpointParameterInputHeight,
  }) {
  const [endpointRequestParametersModel, setEndpointRequestParametersModel] = useState(undefined);

  useEffect(() => {
    setEndpointRequestParametersModel(
      modelHelpers.parseObjectIntoModel(
        model?.getData(fieldName),
        endpointRequestParametersMetadata,
      ),
    );
  }, [fieldName]);

  const setModelFunction = (updatedModel) => {
    const newModel = { ...model };
    newModel.setData(fieldName, updatedModel.getPersistData());
    setModel({ ...newModel });
    setEndpointRequestParametersModel({ ...updatedModel });
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
            disabled={disabled}
            height={height}
            endpointParameterArrayInputHeight={endpointParameterArrayInputHeight}
            endpointParameterInputHeight={endpointParameterInputHeight}
          />
        );
      case ENDPOINT_REQUEST_TYPES.PUT:
      case ENDPOINT_REQUEST_TYPES.POST:
        return (
          <EndpointRequestParametersInputBase
            model={endpointRequestParametersModel}
            setModel={setModelFunction}
            parameterFields={endpoint?.requestBodyFields}
            fieldName={"requestBody"}
            disabled={disabled}
            height={height}
            endpointParameterArrayInputHeight={endpointParameterArrayInputHeight}
            endpointParameterInputHeight={endpointParameterInputHeight}
          />
        );
    }
  };

  if (isLoading === true) {
    return (
      <div className={"my-5"}>
        <CenterLoadingIndicator />
      </div>
    );
  }

  if (endpointRequestParametersModel == null || model == null || endpoint == null) {
    return null;
  }

  return (
    <div>
      {getDynamicInputsForRequestType()}
    </div>
  );
}

EndpointApiConfigurationInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  endpoint: PropTypes.object,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  height: PropTypes.string,
  endpointParameterArrayInputHeight: PropTypes.string,
  endpointParameterInputHeight: PropTypes.string,
};

export default EndpointApiConfigurationInputBase;