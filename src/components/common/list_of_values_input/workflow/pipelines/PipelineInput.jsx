import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import pipelineActions from "../../../../workflow/pipeline-actions";
import {AuthContext} from "../../../../../contexts/AuthContext";
import DtoSelectInput from "../../../input/dto_input/dto-select-input";
import PipelineSummaryCard from "../../../../workflow/pipelines/pipeline_details/PipelineSummaryCard";
import pipelineMetadata from "../../../../workflow/pipelines/pipeline_details/pipeline-metadata";
import Model from "../../../../../core/data_model/model";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

function PipelineInput({ currentPipelineId, visible, fieldName, dataObject, setDataObject, disabled}) {
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

  const getSelectedPipelineSummary = () => {
    let foundPipeline = pipelines.find(pipeline => pipeline.id === dataObject.getData(fieldName));

    if (foundPipeline != null) {
      let pipelineDataObject = new Model({...foundPipeline.pipeline}, pipelineMetadata, false);
      return (<PipelineSummaryCard pipelineData={pipelineDataObject} /> )
    }

    return ('Could not get pipeline details. Pipeline may have been deleted');
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "" && !isLoading) {
      return (
        <div>
          {getSelectedPipelineSummary()}
        </div>
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
    <div>
      <DtoSelectInput
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={pipelines}
        busy={isLoading}
        valueField="id"
        textField="name"
        disabled={disabled || isLoading}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
    </div>
  );
}

PipelineInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default PipelineInput;