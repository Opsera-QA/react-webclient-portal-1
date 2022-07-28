import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestHeaderConfigurationMetadata
} from "components/common/inputs/endpoints/endpoint/request/headers/endpointRequestHeaderConfiguration.metadata";
import EndpointRequestHeaderTokenConfiguration
  from "components/common/inputs/endpoints/endpoint/request/headers/EndpointRequestHeaderTokenConfiguration";
import EndpointRequestHeaderUseAuthorizationTokenToggleInput
  from "components/common/inputs/endpoints/endpoint/request/headers/EndpointRequestHeaderUseAuthorizationTokenToggleInput";

function EndpointRequestHeaderConfigurationInput(
  {
    disabled,
    model,
    setModel,
    toolId,
  }) {
  const [endpointRequestHeaderConfigurationModel, setEndpointRequestHeaderConfigurationModel] = useState(undefined);

  useEffect(() => {
    setEndpointRequestHeaderConfigurationModel(modelHelpers.parseObjectIntoModel(model?.getData("headerConfiguration"), endpointRequestHeaderConfigurationMetadata));
  }, []);

  const updateMainModelFunction = (newModel) => {
    const updatedModel = {...model};
    const headerConfiguration = newModel?.getPersistData();
    updatedModel.setData("headerConfiguration", headerConfiguration);
    setEndpointRequestHeaderConfigurationModel({...newModel});
    setModel({...updatedModel});
  };

  const getRequestHeaderTokenPanel = () => {
    if (endpointRequestHeaderConfigurationModel?.getData("useAuthorizationToken") === true) {
      return (
        <EndpointRequestHeaderTokenConfiguration
          endpointRequestHeaderConfigurationModel={endpointRequestHeaderConfigurationModel}
          disabled={disabled}
          setEndpointRequestHeaderConfigurationModel={setEndpointRequestHeaderConfigurationModel}
          updateMainModelFunction={updateMainModelFunction}
          toolId={toolId}
        />
      );
    }
  };

  if (endpointRequestHeaderConfigurationModel == null) {
    return null;
  }

  return (
    <div className={"mx-3 mb-3 mt-1 h-100"}>
      <div>
        <EndpointRequestHeaderUseAuthorizationTokenToggleInput
          model={endpointRequestHeaderConfigurationModel}
          setModel={setEndpointRequestHeaderConfigurationModel}
          updateMainModelFunction={updateMainModelFunction}
          disabled={disabled}
        />
      </div>
      {getRequestHeaderTokenPanel()}
    </div>
  );
}

EndpointRequestHeaderConfigurationInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
};

export default EndpointRequestHeaderConfigurationInput;