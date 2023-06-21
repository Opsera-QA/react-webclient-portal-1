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
import ExternalApiIntegrationStepRunResponseParameterSelectInput
  from "components/workflow/plan/step/external_rest_api_integration/inputs/request/ExternalApiIntegrationStepRunResponseParameterSelectInput";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function EndpointRequestParameterInputRow(
  {
    disabled,
    updateParameterFunction,
    endpointBodyField,
    endpointParameterArrayInputHeight,
    endpointParameterInputHeight,
    toolId,
    runEndpointId,
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
    const useRunApiResponseParameter = endpointFieldModel?.getData("useRunApiResponseParameter");

    if (useRunApiResponseParameter === true) {
      return (
        <div
          className={"mx-3 mt-2"}
          style={{minHeight: endpointParameterInputHeight}}
        >
          <H5FieldSubHeader
            subheaderText={"Select the Call Operation Response field to use for this parameter"}
          />
          <ExternalApiIntegrationStepRunResponseParameterSelectInput
            model={endpointFieldModel}
            toolId={toolId}
            runEndpointId={runEndpointId}
            disabled={disabled}
            setDataFunction={updateMainModelFunction}
          />
        </div>
      );
    }

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
  toolId: PropTypes.string,
  runEndpointId: PropTypes.string,
  updateParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
  endpointParameterArrayInputHeight: PropTypes.string,
  endpointParameterInputHeight: PropTypes.string,
};
