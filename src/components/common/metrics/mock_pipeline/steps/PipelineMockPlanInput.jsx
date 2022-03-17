import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { pipelineMockStepMetadata } from "components/common/metrics/mock_pipeline/steps/pipelineMockStepMetadata";
import PipelineMockStepInputRow from "components/common/metrics/mock_pipeline/steps/PipelineMockStepEditorPanel";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";

function PipelineMockPlanInput({ fieldName, model, setModel, disabled }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const newJobs = model?.getData(fieldName);

    if (Array.isArray(newJobs)) {
      setSteps(newJobs);
    }
  }, []);

  const validateAndSetData = (newSteps) => {
    if (!Array.isArray(newSteps)) {
      return;
    }

    setSteps([...newSteps]);
    const newModel = { ...model };

    if (newSteps.length > field.maxItems) {
      setErrorMessage(
        "You have reached the maximum allowed number of configuration items. Please remove one to add another."
      );
      return;
    }

    const validatedJobs = [];

    if (newSteps.length > 0) {
      newSteps.map((step) => {
        if (isStepComplete(step) === true) {
          validatedJobs.push(step);
        }
      });
    }

    newModel.setData(fieldName, validatedJobs);
    setModel({ ...newModel });
  };

  const addNewStep = () => {
    const newEnvironmentList = steps;

    if (lastStepComplete() !== true) {
      return;
    }

    newEnvironmentList.push({ ...pipelineMockStepMetadata.newObjectFields });
    validateAndSetData(newEnvironmentList);
  };

  const deleteStepFunction = (index) => {
    let newJobsList = steps;
    newJobsList.splice(index, 1);
    validateAndSetData(newJobsList);
  };

  const updateStepFunction = (index, model) => {
    const newStepsList = [...steps];

    newStepsList[index] = model?.getPersistData();
    validateAndSetData(newStepsList);
  };

  const getFieldBody = () => {
    if (!Array.isArray(steps) || steps.length === 0) {
      return (
        <div className="rules-input">
          <div className="text-muted text-center no-data-message">No steps have been added</div>
        </div>
      );
    }

    return (
      <div>
        {steps.map((pipelineStep, index) => {
          return (
            <div key={index}>
              <PipelineMockStepInputRow
                pipelineStep={pipelineStep}
                deleteStepFunction={() => deleteStepFunction(index)}
                updateStepFunction={(newModel) => updateStepFunction(index, newModel)}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // TODO: Check for required fields
  // TODO: Do we want to allow incomplete savings?
  const isStepComplete = (step) => {
    return hasStringValue(step?.name) === true;
  };

  const lastStepComplete = () => {
    let newSteps = steps;

    if (!Array.isArray(newSteps) || newSteps.length === 0) {
      return true;
    }

    return isStepComplete(newSteps.lastItem);
  };

  const getIncompletePropertyMessage = () => {
    if (!lastStepComplete()) {
      return `Incomplete Steps Will Be Removed Before Saving`;
    }
  };

  if (field == null) {
    return <></>;
  }

  // TODO: Convert this into the steps array inside the workflow item inside the pipeline data mapping
  return (
    <PropertyInputContainer
      titleIcon={faBracketsCurly} // Todo: pick better icon
      field={field}
      addProperty={addNewStep}
      titleText={"Steps"}
      errorMessage={errorMessage}
      addAllowed={lastStepComplete()}
      type={"steps"}
      incompleteRowMessage={getIncompletePropertyMessage()}
    >
      {getFieldBody()}
    </PropertyInputContainer>
  );
}

PipelineMockPlanInput.propTypes = {
  setModel: PropTypes.func,
  model: PropTypes.object,
  fields: PropTypes.array,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PipelineMockPlanInput;
