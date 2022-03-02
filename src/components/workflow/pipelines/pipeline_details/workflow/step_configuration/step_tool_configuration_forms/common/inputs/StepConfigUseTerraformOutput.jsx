import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import { Form } from "react-bootstrap";

function StepConfigUseTerraformOutput({ dataObject, setDataObject, fieldName, disabled, plan, stepId }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [terraformList, setTerraformList] = useState([]);

  useEffect(() => {
    if (plan && stepId) {
      let pipelineSteps = formatStepOptions(plan, stepId);
      let terraformSteps = pipelineSteps.filter(
        (step) =>
          step.tool.tool_identifier.toLowerCase() === "terraform" && step.tool.configuration.customParameters.length > 0
      );
      if (terraformSteps.length === 0) {
        let newDataObject = { ...dataObject };
        newDataObject.setData("terraformStepId", "");
        setDataObject({ ...newDataObject });
      }
      setTerraformList(terraformSteps);
    }
  }, []);

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  const handleChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData("useTerraformOutput");
    newDataObject.setData("useTerraformOutput", sourceScriptFlag);
    let customParameters = dataObject?.getData("customParameters") && Array.isArray(dataObject?.getData("customParameters")) ? dataObject?.getData("customParameters") : [];
    if (!sourceScriptFlag) {
      newDataObject.setData("terraformStepId", "");
    }
    if (!sourceScriptFlag && customParameters.length > 0) {
      let filtered = [];
      for (let item in customParameters) {
        if (!customParameters[item]?.outputKey) {
          filtered.push(customParameters[item]);
        }
      }
      newDataObject.setData("customParameters", filtered);
    }
    setDataObject({ ...newDataObject });
  };

  if (terraformList === null || terraformList.length === 0) {
    return null;
  }

  return (
    <>
      <InputContainer>
        <Form.Check
          type="switch"
          id={field.id}
          checked={!!dataObject.getData(fieldName)}
          disabled={disabled}
          label={field.label}
          onChange={() => handleChange()}
        />
      </InputContainer>
    </>
  );
}

StepConfigUseTerraformOutput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default StepConfigUseTerraformOutput;
