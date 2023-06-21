import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestParameterMetadata
} from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/endpointRequestParameter.metadata";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import EndpointRequestParameterManualValueEntryInput
  from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/EndpointRequestParameterManualValueEntryInput";

function EndpointRequestParameterInputRow(
  {
    disabled,
    updateParameterFunction,
    endpointBodyField,
    endpointParameterArrayInputHeight,
    endpointParameterInputHeight,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointRequestParameterMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    const newModel = {...endpointFieldModel};
    newModel.setData(fieldName, newValue);
    updateParameterFunction({...newModel?.getCurrentData()});
  };

  const getValueInput = () => {
    return (
      <EndpointRequestParameterManualValueEntryInput
        endpointParameterInputHeight={endpointParameterInputHeight}
        endpointParameterArrayInputHeight={endpointParameterArrayInputHeight}
        disabled={disabled}
        model={endpointFieldModel}
        setModel={setEndpointFieldModel}
        setDataFunction={updateMainModelFunction}
      />
    );
  };

  if (endpointFieldModel == null) {
    return null;
  }

  return (
    <VanitySetTabContentContainer
      titleIcon={faCode}
      title={`Field: ${endpointFieldModel?.getData("fieldName")}`}
    >
      <div className={"h-100"}>
        {getValueInput()}
      </div>
    </VanitySetTabContentContainer>
  );
}

EndpointRequestParameterInputRow.propTypes = {
  updateParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
  endpointParameterArrayInputHeight: PropTypes.string,
  endpointParameterInputHeight: PropTypes.string,
};

export default EndpointRequestParameterInputRow;