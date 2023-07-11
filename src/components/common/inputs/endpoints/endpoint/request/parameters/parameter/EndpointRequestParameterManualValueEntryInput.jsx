import React from "react";
import PropTypes from "prop-types";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import CustomParameterComboBoxInput
from "components/common/list_of_values_input/parameters/CustomParameterComboBoxInput";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import BooleanSelectInput from "components/common/list_of_values_input/boolean/BooleanSelectInput";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";

export default function EndpointRequestParameterManualValueEntryInput(
  {
    disabled,
    setDataFunction,
    model,
    setModel,
    endpointParameterArrayInputHeight,
    endpointParameterInputHeight,
  }) {
  const type = model?.getData("type");
  const isSensitiveData = model?.getData("isSensitiveData");

  const getInfoText = () => {
    let infoText = "";

    if (model?.getData("isRequired") === true) {
      infoText += `${model?.getData("fieldName")} is required. If this is not included, the run will fail.`;
    }

    if (model?.getData("isSensitiveData") === true) {
      infoText += `${model?.getData("fieldName")} is listed as sensitive data. You must use an encrypted custom parameter saved in the Tool Registry`;
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

  if (type == null || model == null || setDataFunction == null) {
    return null;
  }

  const getInput = () => {
    switch (type) {
    case "string":
      if (isSensitiveData === true) {
        return (
          <div className={"mx-3 mt-2"} style={{minHeight: endpointParameterInputHeight}}>
            <CustomParameterSelectInput
              model={model}
              fieldName={"value"}
              className={"value-parameter"}
              requireVaultSavedParameters={true}
              setDataFunction={(fieldName, customParameter) => setDataFunction(fieldName, customParameter?._id)}
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
            model={model}
            fieldName={"value"}
            className={"value-parameter"}
            requireInsensitiveParameters={true}
            setDataFunction={setDataFunction}
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
            model={model}
            setModel={setModel}
            fieldName={"value"}
            setDataFunction={setDataFunction}
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
            dataObject={model}
            setDataObject={setModel}
            setDataFunction={setDataFunction}
            fieldName={"value"}
            defaultToNull={true}
            disabled={disabled}
            clearDataFunction={() => setDataFunction("value", undefined)}
          />
        </div>
      );
    case "boolean":
      return (
        <div className={"mx-3 mt-2"} style={{minHeight: endpointParameterInputHeight}}>
          <BooleanSelectInput
            model={model}
            setModel={setModel}
            fieldName={"value"}
            setDataFunction={(fieldName, selectedOption) => setDataFunction(fieldName, selectedOption?.value)}
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

  return (
    <>
      {getInput()}
    </>
  );
}

EndpointRequestParameterManualValueEntryInput.propTypes = {
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  model: PropTypes.object,
  setModel: PropTypes.func,
  endpointParameterArrayInputHeight: PropTypes.string,
  endpointParameterInputHeight: PropTypes.string,
};
