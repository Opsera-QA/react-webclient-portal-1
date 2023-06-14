import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import BooleanSelectInput from "components/common/list_of_values_input/boolean/BooleanSelectInput";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import {
  externalApiIntegratorStatusEndpointRequestParameterMetadata
} from "components/workflow/plan/step/external_rest_api_integration/inputs/request/status/parameters/parameter/externalApiIntegratorStatusEndpointRequestParameter.metadata";

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

  const getInfoText = () => {
    let infoText = "";

    if (endpointFieldModel?.getData("isRequired") === true) {
      infoText += `${endpointFieldModel?.getData("fieldName")} is required. If this is not included, the run will fail.`;
    }

    if (endpointFieldModel?.getData("isSensitiveData") === true) {
      infoText += `${endpointFieldModel?.getData("fieldName")} is listed as sensitive data. You must use an encrypted custom parameter saved in the Tool Registry`;
    }

    return infoText;
  };

  const getInfoTextField = () => {
    const infoText = getInfoText();

    if (hasStringValue(infoText) === true) {
      return (
        <div className={"mx-2 mb-2"}>
          <InfoText
            customMessage={getInfoText()}
          />
        </div>
      );
    }
  };

  const updateSensitiveCustomParameter = (fieldName, newValue) => {
    updateMainModelFunction(fieldName, newValue?._id);
  };

  const getValueInput = () => {
    const type = endpointFieldModel?.getData("type");
    const isSensitiveData = endpointFieldModel?.getData("isSensitiveData");
    const useRunApiResponseParameter = endpointFieldModel?.getData("useRunApiResponseParameter");

    switch (type) {
      case "string":
        if (isSensitiveData === true) {
          return (
            <div className={"mx-3 mt-2"} style={{minHeight: endpointParameterInputHeight}}>
              <CustomParameterSelectInput
                model={endpointFieldModel}
                fieldName={"value"}
                className={"value-parameter"}
                requireVaultSavedParameters={true}
                setDataFunction={updateSensitiveCustomParameter}
                disabled={disabled}
              />
              <div className={"d-flex justify-content-end"}>
                {getInfoTextField()}
              </div>
            </div>
          );
        }

        return (
          <div className={"mx-3 mt-2"} style={{minHeight: endpointParameterInputHeight}}>
            <CustomParameterComboBoxInput
              model={endpointFieldModel}
              fieldName={"value"}
              className={"value-parameter"}
              requireInsensitiveParameters={true}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
            />
            <div className={"d-flex justify-content-end"}>
              {getInfoTextField()}
            </div>
          </div>
        );
      case "array":
        return (
          <div className={"m-3"}>
            <MultiTextListInputBase
              model={endpointFieldModel}
              setModel={setEndpointFieldModel}
              fieldName={"value"}
              setDataFunction={updateMainModelFunction}
              disabled={disabled}
              singularTopic={"Value"}
              pluralTopic={"Values"}
              allowDuplicates={true}
              minimumHeight={endpointParameterArrayInputHeight}
              maximumHeight={endpointParameterArrayInputHeight}
            />
          </div>
        );
      case "date":
        return (
          <div className={"mx-3 mt-2"} style={{minHeight: endpointParameterInputHeight}}>
            <DateTimeInput
              dataObject={endpointFieldModel}
              setDataObject={setEndpointFieldModel}
              setDataFunction={updateMainModelFunction}
              fieldName={"value"}
              defaultToNull={true}
              disabled={disabled}
              clearDataFunction={() => updateMainModelFunction("value", undefined)}
            />
          </div>
        );
      case "boolean":
        return (
          <div className={"mx-3 mt-2"} style={{minHeight: endpointParameterInputHeight}}>
            <BooleanSelectInput
              model={endpointFieldModel}
              setModel={setEndpointFieldModel}
              fieldName={"value"}
              setDataFunction={(fieldName, selectedOption) => updateMainModelFunction(fieldName, selectedOption?.value)}
              disabled={disabled}
            />
          </div>
        );
      case "object":
      default:
        return (
          <CenteredContentWrapper>
            <div>{`Entering this parameter type's value is not currently supported.`}</div>
          </CenteredContentWrapper>
        );
    }
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
