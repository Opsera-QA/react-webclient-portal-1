import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import AzureDevopsPipelineStepConfigurationHelpDocumentation
  from "components/common/help/documentation/pipelines/step_configuration/AzureDevopsPipelineStepConfigurationHelpDocumentation";
import { hasStringValue } from "components/common/helpers/string-helpers";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";

function BooleanToggleInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    disabled,
    className,
    id,
    infoOverlay,
    inputHelpOverlay,
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(fieldName, newValue);
    }
  };

  const getClassNames = () => {
    let classNames = "";

    if (disabled === true) {
      classNames += "not-allowed-cursor";
    }
    else {
      classNames += "pointer";
    }

    return classNames;
  };

  const getLabelClassNames = () => {
    let classNames = "d-flex";

    if (disabled === true) {
      classNames += " not-allowed-cursor";
    }
    else {
      classNames += " pointer";
    }

    return classNames;
  };

  const getUniqueId = () => {
    let constructedId = field?.id;
    const objectId = dataObject?.getMongoDbId();

    if (objectId) {
      constructedId += `-${objectId}`;
    }

    if (id) {
      constructedId += `-${id}`;
    }

    return constructedId;
  };

  const getInputHelpIcon = () => {
    if (inputHelpOverlay != null) {
      return (
        <LaunchHelpIcon
          className={"ml-2 mt-auto"}
          helpComponent={inputHelpOverlay}
        />
      );
    }

    const fieldHelpTooltipText = field?.helpTooltipText;

    if (hasStringValue(fieldHelpTooltipText) === true) {
      return (
        <HelpInfoOverlayIcon
          infoOverlay={fieldHelpTooltipText}
          title={`${field?.label} Help`}
          className={"ml-2 mt-auto"}
          overlayPlacement={"top"}
        />
      );
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={className}>
      <InputContainer>
        <div className={"d-flex"}>
          <Form.Check
            type={"switch"}
            className={getClassNames()}
            id={getUniqueId()}
            checked={!!dataObject.getData(fieldName)}
            disabled={disabled}
            label={<span className={getLabelClassNames()}> </span>}
            onChange={() => {
              updateValue(!dataObject.getData(fieldName));
            }}
          />
          <div className={"d-flex my-auto"}>
            <span
              className={getLabelClassNames()}
              onClick={() => {updateValue(!dataObject.getData(fieldName));}}
            >
              {field?.label}
            </span>
            {getInputHelpIcon()}
          </div>
        </div>
        <InfoText
          field={field}
          model={dataObject}
          fieldName={fieldName}
        />
      </InputContainer>
    </div>
  );
}

BooleanToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
};

export default BooleanToggleInput;