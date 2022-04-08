import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneTextInputBase from "components/common/inputs/text/standalone/StandaloneTextInputBase";
import {errorHelpers} from "components/common/helpers/error-helpers";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import TextValueCard from "components/common/inputs/list/text/TextValueCard";
import InputContainer from "components/common/inputs/InputContainer";

function MultiTextListInputBase(
  {
    model,
    setModel,
    setDataFunction,
    fieldName,
    customTitle,
    isPotentialValueValidFunction,
    error,
    singularTopic,
    pluralTopic,
    placeholderText,
    className,
    disabled,
    allowDuplicates,
    minimumHeight,
    maximumHeight,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [potentialValue, setPotentialValue] = useState("");
  const [internalPlaceholderText, setInternalPlaceholderText] = useState("");
  const [internalErrorMessage, setInternalErrorMessage] = useState("");

  useEffect(() => {
    setInternalErrorMessage("");
    setInternalPlaceholderText("");

    if (error) {
      setInternalPlaceholderText(errorHelpers.constructApiResponseErrorPlaceholderText(pluralTopic));
      setInternalErrorMessage(errorHelpers.parseApiErrorForInfoText(pluralTopic, error));
    }
  }, [error]);

  useEffect(() => {
    setField(model?.getFieldById(fieldName));
    setErrorMessage("");
    setPotentialValue("");
  }, [fieldName]);

  const validateAndSetData = (fieldName, value) => {
    const newModel = {...model};

    if (value.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    newModel?.setData(fieldName, value);
    const errors = newModel?.isFieldValid(field.id);
    const newErrorMessage = Array.isArray(errors) && errors.length > 0 ? errors[0] : "";
    setErrorMessage(newErrorMessage);

    setModel({...newModel});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(fieldName, newValue);
    }
  };

  const removeAllItems = () => {
    updateValue([]);
  };

  const deleteValueFunction = (index) => {
    const newFields = [...model?.getArrayData(fieldName)];
    newFields.splice(index, 1);
    updateValue(newFields);
  };

  const formatItems = () => {
    const items = model?.getArrayData(fieldName);

    if (!Array.isArray(items) || items.length === 0) {
      return (
        <div className={"h-100 m-auto text-center"}>
          <span>No Items Added</span>
        </div>
      );
    }

    return (items.map((item, index) => {
      return (
        <div key={index} className={index % 2 === 0 ? "odd-row-background-color" : "even-row-background-color"}>
          <TextValueCard
            value={item}
            className={"p-2"}
            index={index}
            disabled={disabled}
            deleteValueFunction={() => deleteValueFunction(index)}
          />
        </div>
      );
    }));
  };

  const getTitle = () => {
    if (hasStringValue(customTitle) === true) {
      return customTitle;
    }

    return field?.label;
  };

  const getErrorMessage = () => {
    if (isPotentialValueValidFunction && hasStringValue(potentialValue) === true && isPotentialValueValidFunction(potentialValue) === false) {
      return (`The entered ${singularTopic} is invalid.`);
    }

    if (allowDuplicates !== true && isPotentialValueADuplicate() === true) {
      return (`The entered ${singularTopic} is a duplicate. Duplicate ${pluralTopic} are not allowed.`);
    }

    if (hasStringValue(internalErrorMessage) === true) {
      return internalErrorMessage;
    }

    if (hasStringValue(errorMessage) === true) {
      return errorMessage;
    }
  };

  const getPlaceholderText = () => {
    if (hasMaximumItems() === true) {
      return ("You have reached the maximum allowed number of values. Please remove one to add another.");
    }

    if (hasStringValue(internalPlaceholderText) === true) {
      return internalPlaceholderText;
    }

    if (hasStringValue(placeholderText) === true) {
      return placeholderText;
    }

    if (hasStringValue(singularTopic) === true) {
      return `Enter ${singularTopic}`;
    }

    return "Enter One";
  };

  const addValue = () => {
    const newValue = potentialValue;
    const newArray = model?.getArrayData(fieldName);
    newArray.push(newValue);
    updateValue(newArray);
    setPotentialValue("");
  };

  const canAddPotentialValue = () => {
    // TODO: Should we allow adding empty string?
    if (hasStringValue(potentialValue) !== true) {
      return false;
    }

    if (allowDuplicates !== true && isPotentialValueADuplicate() === true) {
      return false;
    }

    if (hasMaximumItems() === true) {
      return false;
    }

    if (isPotentialValueValidFunction != null) {
      return isPotentialValueValidFunction(potentialValue);
    }

    return true;
  };

  const isPotentialValueADuplicate = () => {
    const currentValues = model?.getArrayData(fieldName);
    return Array.isArray(currentValues) && currentValues.includes(potentialValue);
  };

  const getAddButton = () => {
    return (
      <NewRecordButton
        addRecordFunction={addValue}
        type={singularTopic}
        size={"md"}
        customButtonText={`Add ${singularTopic}`}
        disabled={canAddPotentialValue() !== true}
      />
    );
  };

  const getRemoveAllButton = () => {
    return (
      <div>
        <Button
          variant={"danger"}
          size={"sm"}
          onClick={removeAllItems}
          disabled={model?.getArrayData(fieldName)?.length === 0 || disabled}
        >
          <span className={"mr-2"}><IconBase icon={faMinusCircle} className={"mr-2"}/>Remove All</span>
          <span className={"badge badge-secondary"}>{model?.getArrayData(fieldName).length}</span>
        </Button>
      </div>
    );
  };

  const onKeyPressFunction = async (event) => {
    if (event.key === 'Enter' && canAddPotentialValue() === true) {
      await addValue();
    }
  };

  const hasMaximumItems = () => {
    const currentValues = model?.getArrayData(fieldName);
    return Array.isArray(currentValues) && currentValues.length >= field.maxItems;
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InfoContainer
        titleText={getTitle()}
        titleRightSideButton={getRemoveAllButton()}
      >
        <ul
          className={"list-group text-input-list"}
          style={{
            minHeight: minimumHeight,
            maxHeight: maximumHeight,
          }}
        >
          {formatItems()}
        </ul>
      </InfoContainer>
      <div className={"mt-3"}>
        <StandaloneTextInputBase
          placeholderText={getPlaceholderText()}
          value={potentialValue}
          setDataFunction={setPotentialValue}
          rightSideInputButton={getAddButton()}
          className={"mb-0"}
          disabled={disabled || hasMaximumItems() === true}
          field={field}
          onKeyPressFunction={onKeyPressFunction}
          error={getErrorMessage()}
        />
      </div>
    </InputContainer>
  );
}

MultiTextListInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  isPotentialValueValidFunction: PropTypes.func,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  fieldName: PropTypes.string,
  customTitle: PropTypes.string,
  error: PropTypes.any,
  placeholderText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  allowDuplicates: PropTypes.bool,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
};

MultiTextListInputBase.defaultProps = {
  singularTopic: "value",
  pluralTopic: "values",
  minimumHeight: "100px",
  maximumHeight: "350px",
};

export default MultiTextListInputBase;