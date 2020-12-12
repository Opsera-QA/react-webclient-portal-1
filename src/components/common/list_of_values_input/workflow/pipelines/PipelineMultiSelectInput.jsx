import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import pipelineActions from "../../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../../contexts/AuthContext";
import PipelineSummaryCard from "../../../../workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineMetadata from "../../../../workflow/pipelines/pipeline_details/pipeline-metadata";
import Model from "../../../../../core/data_model/model";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import MultiSelectInputBase from "../../../input/MultiSelectInputBase";

function PipelineMultiSelectInput({ currentPipelineId, visible, fieldName, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadPipelines();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadPipelines = async () => {
    const response = await pipelineActions.getAllPipelines(getAccessToken);
    if (response?.data?.response) {
      let pipelines = formatPipelines(response?.data?.response);
      setPipelines(pipelines);
    }
  };

  const formatPipelines = (pipelineResponse) => {
    let pipelines = [];
    pipelineResponse.map((pipeline, index) => {
      if (pipeline._id !== currentPipelineId) {
        pipelines.push({
          id: pipeline._id,
          name: `${pipeline.name} (${pipeline._id})`,
          pipeline: pipeline
        });
      }
    });
    return pipelines;
  };

  // TODO: Make pipeline list component with link to pipeline (open in new window)
  const getSelectedPipelineSummary = (selectedPipelineId) => {
    let foundPipeline = pipelines.find(pipeline => pipeline.id === selectedPipelineId);

    if (foundPipeline != null) {
      let pipelineDataObject = new Model({...foundPipeline.pipeline}, pipelineMetadata, false);
      let run = foundPipeline.workflow?.lastRun?.run;
      return (<PipelineSummaryCard pipelineData={pipelineDataObject} run={run != null ? `${run}` : `0`} /> )
    }

    return ('Could not get pipeline details. Pipeline may have been deleted');
  };

  const getPipelineSummaries = () => {
    if (dataObject.getData(fieldName) != null && dataObject.getData(fieldName).length > 0 && !isLoading) {
      return (
        dataObject.getData(fieldName).map((selectedPipelineId) => {
          return(
            <div key={selectedPipelineId}>
            {getSelectedPipelineSummary(selectedPipelineId)}
            </div>
          );
        })
      );
    }

    return <span>Select a pipeline to get started.</span>
  };

  if (visible === false) {
    return <></>;
  }

  if (!isLoading && (pipelines == null || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No other pipelines have been registered. Please go to <Link to="/workflow">Pipelines</Link> and add another pipeline in order to
        configure a child pipeline step.
      </div>
    )
  }

  return (
    <div className="m-2">
      <MultiSelectInputBase
        fieldName={fieldName}
        selectOptions={pipelines}
        dataObject={dataObject}
        setDataObject={setDataObject}
        valueField={"id"}
        textField={"name"}
        busy={isLoading}
        placeholderText={"Select A Pipeline"}
        disabled={disabled}
      />
      {getPipelineSummaries()}
    </div>
  );
}

PipelineMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default PipelineMultiSelectInput;