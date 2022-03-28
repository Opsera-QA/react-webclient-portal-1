import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";
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
    model.setData(fieldName, value);
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

  const formatItem = (item, index) => {
    return (
      <div key={index} className={index % 2 === 0 ? "odd-row-background-color" : "even-row-background-color"}>
        <TextValueCard
          value={item}
          className={"p-2"}
          index={index}
          deleteValueFunction={() => deleteValueFunction(index)}
        />
      </div>
    );
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

    return (items.map((user, i) => {return (formatItem(user, i));}));
  };

  const getTitle = () => {
    if (hasStringValue(customTitle) === true) {
      return customTitle;
    }

    return field?.label;
  };

  const getErrorMessage = () => {
    if (hasStringValue(internalErrorMessage) === true) {
      return internalErrorMessage;
    }

    if (hasStringValue(errorMessage) === true) {
      return errorMessage;
    }
  };

  const getPlaceholderText = () => {
    if (hasStringValue(internalPlaceholderText) === true) {
      return internalPlaceholderText;
    }

    if (hasStringValue(placeholderText) === true) {
      return placeholderText;
    }

    if (hasStringValue(singularTopic) === true) {
      return `Select ${singularTopic}`;
    }

    return "Select One";
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

    if (isPotentialValueValidFunction != null) {
      return isPotentialValueValidFunction(potentialValue);
    }

    return true;
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
          disabled={model?.getArrayData(fieldName)?.length === 0}
        >
          <span className={"mr-2"}><IconBase icon={faMinusCircle} className={"mr-2"}/>Remove All</span>
          <span className={"badge badge-secondary"}>{model?.getArrayData(fieldName).length}</span>
        </Button>
      </div>
    );
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
        <ul className={"list-group text-input-list"}>
          {formatItems()}
        </ul>
      </InfoContainer>
      <div className={"mt-3 d-flex"}>
        <StandaloneTextInputBase
          placeholderText={getPlaceholderText()}
          value={potentialValue}
          setDataFunction={setPotentialValue}
          rightSideInputButton={getAddButton()}
          className={"mb-0"}
        />
      </div>
      <InfoText
        field={field}
        errorMessage={getErrorMessage()}
      />
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
};

export default MultiTextListInputBase;