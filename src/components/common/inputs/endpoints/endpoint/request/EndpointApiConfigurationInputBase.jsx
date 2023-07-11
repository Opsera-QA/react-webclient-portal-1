import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EndpointRequestParametersInputBase
from "components/common/inputs/endpoints/endpoint/request/parameters/EndpointRequestParametersInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import endpointRequestParametersMetadata
from "@opsera/definitions/constants/api/request/parameters/endpointRequestParameters.metadata";
import endpointRequestType from "@opsera/definitions/constants/api/request/endpoint/endpointRequestType.constants";

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
      case endpointRequestType.ENDPOINT_REQUEST_TYPES.GET:
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
            runEndpointId={model?.getData("runEndpointId")}
            toolId={model?.getData("toolId")}
          />
        );
      case endpointRequestType.ENDPOINT_REQUEST_TYPES.PUT:
      case endpointRequestType.ENDPOINT_REQUEST_TYPES.POST:
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
            runEndpointId={model?.getData("runEndpointId")}
            toolId={model?.getData("toolId")}
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
    <div id={fieldName}>
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