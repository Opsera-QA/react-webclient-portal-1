import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestHeaderConfigurationMetadata
} from "components/common/inputs/endpoints/endpoint/request/headers/endpointRequestHeaderConfiguration.metadata";
import EndpointRequestHeaderUseAuthorizationTokenToggleInput
  from "components/common/inputs/endpoints/endpoint/request/headers/EndpointRequestHeaderUseAuthorizationTokenToggleInput";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";

function EndpointRequestHeaderConfigurationInput(
  {
    disabled,
    model,
    setModel,
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

  // TODO: Make separate input
  const updateCustomParameterId = (fieldName, selectedOption) => {
    endpointRequestHeaderConfigurationModel.setData(fieldName, selectedOption?._id);
    updateMainModelFunction(endpointRequestHeaderConfigurationModel);
  };

  if (endpointRequestHeaderConfigurationModel == null) {
    return null;
  }

  return (
    <div className={"mx-3 mb-3 mt-1 h-100"}>
      <Row>
        <Col xs={12}>
          <EndpointRequestHeaderUseAuthorizationTokenToggleInput
            model={endpointRequestHeaderConfigurationModel}
            setModel={setEndpointRequestHeaderConfigurationModel}
            updateMainModelFunction={updateMainModelFunction}
            disabled={disabled}
          />
        </Col>
        <Col xs={12}>
          <CustomParameterSelectInput
            model={endpointRequestHeaderConfigurationModel}
            setModel={setEndpointRequestHeaderConfigurationModel}
            setDataFunction={updateCustomParameterId}
            disabled={disabled}
            fieldName={"authorizationTokenCustomParameterId"}
          />
        </Col>
      </Row>
    </div>
  );
}

EndpointRequestHeaderConfigurationInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointRequestHeaderConfigurationInput;