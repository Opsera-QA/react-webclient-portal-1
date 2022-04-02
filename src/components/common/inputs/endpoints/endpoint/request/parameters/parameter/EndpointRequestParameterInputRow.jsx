import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import {
  endpointRequestParameterMetadata
} from "components/common/inputs/endpoints/endpoint/request/parameters/parameter/endpointRequestParameter.metadata";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import CustomParameterComboBoxInput
  from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import VanitySetTabContentContainer from "components/common/tabs/vertical_tabs/VanitySetTabContentContainer";

function EndpointRequestParameterInputRow(
  {
    disabled,
    updateParameterFunction,
    endpointBodyField,
  }) {
  const [endpointFieldModel, setEndpointFieldModel] = useState(undefined);

  useEffect(() => {
    setEndpointFieldModel(modelHelpers.parseObjectIntoModel(endpointBodyField, endpointRequestParameterMetadata));
  }, [endpointBodyField]);

  const updateMainModelFunction = (fieldName, newValue) => {
    const newModel = {...endpointFieldModel};
    newModel.setData(fieldName, newValue);
    updateParameterFunction({...newModel?.getPersistData()});
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

  const updateInsensitiveCustomParameter = (fieldName, newValue) => {
    updateMainModelFunction(fieldName, newValue?.value);
  };

  const getValueInput = () => {
    const type = endpointFieldModel?.getData("type");
    const isSensitiveData = endpointFieldModel?.getData("isSensitiveData");

    switch (type) {
      case "string":
        if (isSensitiveData === true) {
          return (
            <div className={"mx-3 my-2"}>
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
          <div className={"mx-3 my-2"}>
            <CustomParameterComboBoxInput
              model={endpointFieldModel}
              fieldName={"value"}
              className={"value-parameter"}
              requireInsensitiveParameters={true}
              setDataFunction={updateInsensitiveCustomParameter}
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
            />
          </div>
        );
      case "date":
        return (
          <div className={"mx-3 mb-3 mt-2"}>
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
        {getValueInput()}
      </div>
    </VanitySetTabContentContainer>
  );
}

EndpointRequestParameterInputRow.propTypes = {
  updateParameterFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpointBodyField: PropTypes.object,
};

export default EndpointRequestParameterInputRow;