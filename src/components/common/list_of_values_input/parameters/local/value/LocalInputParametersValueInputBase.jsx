import React, {useState} from "react";
import PropTypes from "prop-types";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import InfoContainer from "components/common/containers/InfoContainer";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import LocalInputParametersValueInputRow
  from "components/common/list_of_values_input/parameters/local/value/LocalInputParametersValueInputRow";

export default function LocalInputParametersValueInputBase(
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
  };

  const updateParameterFunction = (index, newValue) => {
    setErrorMessage("");
    const currentData = model?.getArrayData(fieldName);
    currentData[index] = newValue;
    validateAndSetData(currentData);
  };

  const getFieldBody = () => {
    const data = DataParsingHelper.parseArray(model?.getArrayData(fieldName), []);

    return (
      <div className="flex-fill">
        {data.map((parameter, index) => {
            return (
              <LocalInputParametersValueInputRow
                disabled={disabled}
                setDataFunction={updateParameterFunction}
                index={index}
                key={index}
                localParameter={parameter}
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
        <div className={"m-2"}>
          {getFieldBody()}
        </div>
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

LocalInputParametersValueInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  customTitle: PropTypes.string,
};

LocalInputParametersValueInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
};
