import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

export default function PipelineStepAddCustomParameterButton(
  {
    customParametersFieldName,
    className,
    disabled,
    model,
    setModel,
    setError,
    parameterModel,
    setParameterModel,
  }) {
  const addGlobalCustomParameterFunction = (newParameter) => {
    const newArray = [];
    const parsedUpdatedData = DataParsingHelper.parseArray(model?.getData(customParametersFieldName), []);
    const field = model?.getFieldById(customParametersFieldName);

    if (parsedUpdatedData.length > field.maxItems) {
      setError(`You have reached the maximum allowed number of Global Parameters. Please remove one to add another.`);
      return false;
    }

    if (parsedUpdatedData.find((parameter) => parameter?.parameterName === newParameter?.parameterName) != null) {
      setError(`You have already added ${newParameter?.parameterName}.`);
      return false;
    }

    newArray.push({
      parameterId: newParameter?.parameterId,
      parameterName: newParameter?.parameterName,
    });

    parsedUpdatedData.forEach((parameter) => {
      if (hasStringValue(parameter?.parameterName) === true && isMongoDbId(parameter?.parameterId) === true) {
        newArray.push({
          parameterName: parameter?.parameterName,
          parameterId: parameter?.parameterId,
        });
      }
    });

    model.setData(customParametersFieldName, [...newArray]);
    setModel({...model});
    return true;
  };

  const handleAddPropertyFunction = () => {
    const newParameter = parameterModel?.getPersistData();
    const successfulAdd = addGlobalCustomParameterFunction(newParameter);

    if (successfulAdd === true) {
      parameterModel.resetData();
      setParameterModel({...parameterModel});
    }
  };

  const customParameters = model?.getArrayData(customParametersFieldName);
  const parameterName = parameterModel?.getData("parameterName");
  const isDuplicate = customParameters.find((parameter) => parameter?.parameterName === parameterName) != null;
  const isValid = parameterModel?.checkCurrentValidity();

  return (
    <VanityButtonBase
      className={className}
      variant={"success"}
      icon={faPlus}
      disabled={disabled || isDuplicate === true || isValid !== true}
      onClickFunction={handleAddPropertyFunction}
      normalText={"Add Parameter"}
    />
  );
}

PipelineStepAddCustomParameterButton.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  customParametersFieldName: PropTypes.string,
  setError: PropTypes.func,
  parameterModel: PropTypes.object,
  setParameterModel: PropTypes.func,
};