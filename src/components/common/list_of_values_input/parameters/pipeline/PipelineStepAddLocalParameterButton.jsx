import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineStepAddLocalParameterButton(
  {
    localParametersFieldName,
    className,
    disabled,
    model,
    setModel,
    setError,
    parameterModel,
    setParameterModel,
  }) {
  const addLocalParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData(localParametersFieldName), []);
    const field = model?.getFieldById(localParametersFieldName);
    const newParameterName = DataParsingHelper.parseString(newParameter?.name, "");
    const newParameterValue = DataParsingHelper.parseString(newParameter?.value, "");

    if (hasStringValue(newParameterName) !== true) {
      setError(`A Local Parameter must have a name.`);
      return false;
    }

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Local Input Parameters. Please remove one to add another.`);
      return false;
    }

    if (parsedUpdatedData.find((parameter) => parameter?.name === newParameterName) != null) {
      setError(`You have already added ${newParameterName}.`);
      return false;
    }

    parsedUpdatedData.push({
      name: newParameterName,
      value: newParameterValue,
    });

    parsedUpdatedData.forEach((parameter) => {
      const parsedParameterName = DataParsingHelper.parseString(parameter?.name, "");
      const parsedParameterValue = DataParsingHelper.parseString(parameter?.value, "");

      if (hasStringValue(parsedParameterName) === true) {
        newArray.push({
          name: parsedParameterName,
          value: parsedParameterValue,
        });
      }
    });

    model.setData(localParametersFieldName, [...newArray]);
    setModel({...model});
    return true;
  };
  
  const handleAddPropertyFunction = () => {
    const newParameter = parameterModel?.getPersistData();
    const successfulAdd = addLocalParameterFunction(newParameter);

    if (successfulAdd === true) {
      parameterModel.resetData();
      setParameterModel({...parameterModel});
    }
  };

  const name = DataParsingHelper.parseString(parameterModel?.getData("name"), "");
  const isValid = parameterModel?.checkCurrentValidity();
  const invalidLocalParameter = name.startsWith("opsera-local-") !== true || name === "opsera-local-";
  const parameterName = parameterModel?.getData("name");
  const stepParameters = model?.getArrayData(localParametersFieldName);
  const hasDuplicateName = stepParameters.find((parameter) => parameter?.name === parameterName) != null;

  return (
    <VanityButtonBase
      className={className}
      variant={"success"}
      icon={faPlus}
      disabled={disabled || isValid === true || invalidLocalParameter === true || hasDuplicateName === true}
      onClickFunction={handleAddPropertyFunction}
      normalText={"Add Parameter"}
    />
  );
}

PipelineStepAddLocalParameterButton.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  localParametersFieldName: PropTypes.string,
  setError: PropTypes.func,
  parameterModel: PropTypes.object,
  setParameterModel: PropTypes.func,
};