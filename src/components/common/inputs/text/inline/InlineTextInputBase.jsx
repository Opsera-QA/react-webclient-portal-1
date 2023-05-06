import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";
import {InputGroup} from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import FieldLabel from "components/common/fields/FieldLabel";
import InlineInputSaveIcon from "temp-library-components/icon/inputs/InlineInputSaveIcon";
import InlineInputCancelIcon from "temp-library-components/icon/inputs/InlineInputCancelIcon";
import InlineInputEditIcon from "temp-library-components/icon/inputs/InlineInputEditIcon";

export default function InlineTextInputBase(
  {
    fieldName,
    model,
    setModel,
    disabled,
    type,
    showInputLabel,
    showFieldLabel,
    inputClasses,
    linkTooltipText,
    detailViewLink,
    infoOverlay,
    setDataFunction,
    name,
    style,
    className,
    error,
    rightSideInputButton,
    inputButtons,
    inputHelpOverlay,
    visible,
    helpTooltipText,
    handleSaveFunction,
    fieldClassName,
  }) {
  const field = model?.getFieldById(fieldName);
  const [errorMessage, setErrorMessage] = useState("");
  const [inEditMode, setInEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const validateAndSetData = (value) => {
    let newDataObject = model;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setModel({...newDataObject});
  };

  const updateValue = (newValue) => {
    if (typeof newValue !== "string") {
      setErrorMessage(`${field?.label} must be a string.`);
      return;
    }

    if (setDataFunction) {
      const newDataObject = setDataFunction(fieldName, newValue);

      if (newDataObject) {
        setErrorMessage(newDataObject?.getFieldError(fieldName));
      }
    }
    else {
      validateAndSetData(newValue);
    }
  };


  const getInputClasses = () => {
    let classes = `form-control`;

    if (hasStringValue(errorMessage) === true) {
      classes += ` border border-danger error-text-alt`;
    }

    if (inputClasses) {
      classes += ` ${inputClasses}`;
    }

    return classes;
  };

  const getErrorStyling = () => {
    if (hasStringValue(errorMessage) === true) {
      return ` error-text-alt`;
    }

    return "";
  };

  const getInputButtons = () => {
    if (inputButtons) {
      return (
        <div className={"d-flex ml-2"}>
          {inputButtons}
        </div>
      );
    }
  };

  const getInputBody = () => {
    return (
      <input
        type={type}
        style={style}
        disabled={disabled}
        name={name}
        value={model.getData(fieldName)}
        onChange={(event) => updateValue(event.target.value)}
        className={getInputClasses()}
        autoComplete={"off"}
      />
    );
  };

  const handleCancelFunction = () => {
    updateValue(model?.getOriginalValue(fieldName));
    setInEditMode(false);
  };

  const handleSave = async () => {
    const isFieldValid = model?.isPotentialFieldValid(fieldName);

    if (isFieldValid !== true) {
      const errors = model.getErrors();
      toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    try {
      setIsSaving(true);
      await handleSaveFunction();
      toastContext.showUpdateSuccessResultDialog(model?.getType());
      setInEditMode(false);
    } catch (error) {
      toastContext.showUpdateFailureResultDialog(model?.getType(), error);
    } finally {
      setIsSaving(false);
    }
  };

  const getInput = () => {
    if (rightSideInputButton != null) {
      return (
        <InputGroup className={"w-100 flex-nowrap text-input-with-button"}>
          {getInputBody()}
          <InputGroup.Append>
            {rightSideInputButton}
          </InputGroup.Append>
        </InputGroup>
      );
    }

    return (
      <div className={"w-100 d-flex" + getErrorStyling()}>
        {getInputBody()}
        {getInputButtons()}
      </div>
    );
  };

  if (field == null || visible === false || handleSaveFunction == null) {
    return null;
  }

  if (inEditMode === true) {
    return (
      <InputContainer className={className} fieldName={fieldName}>
        <InputLabel
          model={model}
          field={field}
          linkTooltipText={linkTooltipText}
          detailViewLink={detailViewLink}
          infoOverlay={infoOverlay}
          inputHelpOverlay={inputHelpOverlay}
          hasError={hasStringValue(errorMessage) === true}
          helpTooltipText={helpTooltipText}
          showLabel={showInputLabel !== false}
        />
        <div className={"d-flex w-100"}>
          {getInput()}
          <InlineInputSaveIcon
            isSaving={isSaving}
            handleSaveFunction={handleSave}
            visible={inEditMode === true && model?.isPotentialFieldValid(model?.getData(fieldName), fieldName) === true && model?.isChanged(fieldName) === true}
            disabled={disabled}
          />
          <InlineInputCancelIcon
            isSaving={isSaving}
            handleCancelFunction={handleCancelFunction}
            visible={isSaving !== true && inEditMode === true}
            disabled={disabled}
          />
        </div>
        <InfoText
          model={model}
          fieldName={fieldName}
          field={field}
          errorMessage={errorMessage}
        />
      </InputContainer>
    );
  }

  return (
    <InputContainer className={className} fieldName={fieldName}>
      <div className={"d-flex w-100"}>
        <FieldLabel
          field={field}
          fieldName={fieldName}
          showLabel={showFieldLabel !== false}
        />
        <div className={fieldClassName}>
          {model?.getData(fieldName)}
        </div>
        <InlineInputEditIcon
          visible={disabled !== true && inEditMode === false}
          disabled={disabled}
          handleEditFunction={() => setInEditMode(true)}
        />
      </div>
    </InputContainer>
  );
}

InlineTextInputBase.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  inputPopover: PropTypes.object,
  inputClasses: PropTypes.string,
  disabled: PropTypes.bool,
  showInputLabel: PropTypes.bool,
  showFieldLabel: PropTypes.bool,
  linkTooltipText: PropTypes.string,
  detailViewLink: PropTypes.string,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
  setDataFunction: PropTypes.func,
  name: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  rightSideInputButton: PropTypes.object,
  inputButtons: PropTypes.any,
  visible: PropTypes.bool,
  helpTooltipText: PropTypes.string,
  handleSaveFunction: PropTypes.func,
  fieldClassName: PropTypes.string,
};