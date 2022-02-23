import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {pipelineMappingJobMetadata} from "components/common/metrics/pipeline_mapper/jobs/pipelineMappingJob.metadata";
import PipelineMappingJobEditorPanel
  from "components/common/metrics/pipeline_mapper/jobs/PipelineMappingJobEditorPanel";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";

function PipelineMappingJobInput({ fieldName, model, setModel, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const newJobs = model?.getData(fieldName);

    if (Array.isArray(newJobs)) {
      setJobs(newJobs);
    }
  }, [model]);

  const validateAndSetData = (jobs) => {
    if (!Array.isArray(jobs)) {
      return;
    }

    setJobs([...jobs]);
    const newModel = {...model};

    if (jobs.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    const validatedJobs = [];

    if (jobs.length > 0) {
      jobs.map((job) => {
        if (isJobComplete(job) === true) {
         validatedJobs.push(job);
        }
      });
    }

    newModel.setData(fieldName, validatedJobs);
    setModel({...newModel});
  };

  const addNewJob = () => {
    const newEnvironmentList = jobs;

    if (lastJobComplete() !== true) {
      return;
    }

    newEnvironmentList.push({...pipelineMappingJobMetadata.newObjectFields});
    validateAndSetData(newEnvironmentList);
  };

  const deleteJobFunction = (index) => {
    let newJobsList = jobs;
    newJobsList.splice(index, 1);
    validateAndSetData(newJobsList);
  };

  const updateJobFunction = (index, model) => {
    const newJobsList = [...jobs];

    newJobsList[index] = model?.getPersistData();
    validateAndSetData(newJobsList);
  };

  const getFieldBody = () => {
    if (!jobs || jobs.length === 0) {
      return (
        <div className="rules-input">
          <div className="text-muted text-center no-data-message">No jobs have been added</div>
        </div>
      );
    }

    return (
      <div>
        {jobs.map((job, index) => {
          return (
            // TODO: We probably want to remove alternating colors
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <PipelineMappingJobEditorPanel
                job={job}
                deleteJobFunction={() => deleteJobFunction(index)}
                updateJobFunction={(newModel) => updateJobFunction(index, newModel)}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // TODO: Check for required fields
  const isJobComplete = (environment) => {
    return (
      hasStringValue(environment?.type) === true
      && hasStringValue(environment?.name) === true
    );
  };

  const lastJobComplete = () => {
    let newJobsList = jobs;

    if (!Array.isArray(newJobsList) || newJobsList.length === 0) {
      return true;
    }

    return isJobComplete(newJobsList.lastItem);
  };

  const getIncompletePropertyMessage = () => {
    if (!lastJobComplete()) {
      return (`Incomplete Jobs Will Be Removed Before Saving`);
    }
  };

  if (field == null) {
    return <></>;
  }

  // Probably want to make a new construct for this but XTREME programming
  return (
    <PropertyInputContainer
      titleIcon={faBracketsCurly} // Todo: pick better icon
      field={field}
      addProperty={addNewJob}
      titleText={"Jobs"}
      errorMessage={errorMessage}
      addAllowed={lastJobComplete()}
      type={"job"}
      incompleteRowMessage={getIncompletePropertyMessage()}
    >
      {getFieldBody()}
    </PropertyInputContainer>
  );
}

PipelineMappingJobInput.propTypes = {
  setModel: PropTypes.func,
  model: PropTypes.object,
  fields: PropTypes.array,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool
};

export default PipelineMappingJobInput;