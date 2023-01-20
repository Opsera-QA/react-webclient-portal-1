import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import LocalInputParametersInputRow
  from "components/common/list_of_values_input/parameters/local/LocalInputParametersInputRow";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import LocalInputParameterInlineField
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterInlineField";
import LocalInputParameterHeaderField
  from "components/common/list_of_values_input/parameters/local/LocalInputParameterHeaderField";

export default function LocalInputParametersInputBase(
  {
    model,
    setModel,
    fieldName,
    titleIcon,
    customTitle,
    disabled,
  }) {
  const field = model.getFieldById(fieldName);
  const titleText = hasStringValue(customTitle) === true ? customTitle : field?.label;
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (updatedData) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(updatedData, []);

    if (parsedUpdatedData.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    parsedUpdatedData.forEach((parameter) => {
      if (parameter?.name !== "" && parameter?.value !== "") {
        newArray.push({
          name: parameter?.name,
          value: parameter?.value,
        });
      }
    });

    model.setData(fieldName, newArray);
    setModel({...model});
    return true;
  };

  const addPropertyFunction = (newParameter) => {
    setErrorMessage("");
    const currentData = model?.getArrayData(fieldName);

    if (currentData.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    const parameterName = newParameter?.name;
    const foundParameter = currentData.find((parameter) => parameter?.name === parameterName);

    if (foundParameter) {
      setErrorMessage("Existing Local Input Parameters can not be added again");
      return false;
    }

    currentData.push(newParameter);
    return validateAndSetData(currentData);
  };

  const deletePropertyFunction = (index) => {
    setErrorMessage("");
    const currentData = model?.getArrayData(fieldName);
    currentData.splice(index, 1);
    validateAndSetData(currentData);
  };

  const getFieldBody = () => {
    const data = DataParsingHelper.parseArray(model?.getArrayData(fieldName), []);

    return (
      <div className="flex-fill">
        {data.map((parameter, index) => {
            return (
              <LocalInputParameterInlineField
                disabled={disabled}
                deleteParameterFunction={deletePropertyFunction}
                parameter={parameter}
                index={index}
                key={index}
              />
            );
          }
        )}
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InfoContainer
        titleIcon={titleIcon}
        titleText={titleText}
      >
        <LocalInputParameterHeaderField />
        <div className={"properties-body-alt"}>
          {getFieldBody()}
        </div>
        <LocalInputParametersInputRow
          disabled={disabled}
          addPropertyFunction={addPropertyFunction}
          className={"m-3"}
          localInputParameters={model?.getArrayData(fieldName)}
        />
      </InfoContainer>
      <InfoText
        model={model}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

LocalInputParametersInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  customTitle: PropTypes.string,
};

LocalInputParametersInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
};
