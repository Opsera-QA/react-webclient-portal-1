import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import {
  externalApiIntegratorStatusEndpointRequestParameterMetadata
} from "components/workflow/plan/step/external_rest_api_integration/inputs/request/status/parameters/parameter/externalApiIntegratorStatusEndpointRequestParameter.metadata";
import EndpointRequestParameterManualValueEntryInput
  from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/EndpointRequestParameterManualValueEntryInput";

export default function ExternalApiIntegratorStatusEndpointRequestParameterInputRow(
  {
    disabled,
    updateParameterFunction,
    endpointBodyField,
    endpointParameterArrayInputHeight,
    endpointParameterInputHeight,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, externalApiIntegratorStatusEndpointRequestParameterMetadata));
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
        <>
          Select run endpoint field
        </>
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
        <div className={"mx-3 mt-2"}>
          {/*//TODO Ensure to clear out selected values when toggling this boolean*/}
          <BooleanToggleInput
            dataObject={endpointFieldModel}
            setDataFunction={(fieldName, newValue) => updateMainModelFunction(fieldName, newValue)}
            fieldName={"useRunApiResponseParameter"}
          />
        </div>
        {getValueInput()}
      </div>
    </VanitySetTabContentContainer>
  );
}

ExternalApiIntegratorStatusEndpointRequestParameterInputRow.propTypes = {
  updateParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
  endpointParameterArrayInputHeight: PropTypes.string,
  endpointParameterInputHeight: PropTypes.string,
};
