import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {Link} from "react-router-dom";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import axios from 'axios';
import IconBase from "components/common/icons/IconBase";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import Model from "core/data_model/model";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function PipelineMultiSelectInput(
  {
    fieldName,
    currentPipelineId,
    model,
    setModel,
    disabled,
    visible,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPipelines(cancelSource);
    }
    catch (error) {
      if(isMounted?.current === true){
        setError(error);
      }
    }
    finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getPipelinesV3(getAccessToken, cancelSource);
    const pipelines = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(pipelines)) {
      setPipelines(pipelines);
    }
  };

  // TODO: Make pipeline list component with link to pipeline (open in new window)
  const getSelectedPipelineSummary = (selectedPipelineId) => {
    let foundPipeline = pipelines.find(pipeline => pipeline._id === selectedPipelineId);

    if (foundPipeline != null) {
      const pipelineDataObject = new Model({...foundPipeline}, pipelineMetadata, false);
      const run = foundPipeline.workflow?.lastRun?.run;

      return (
        <PipelineSummaryCard
          pipelineData={pipelineDataObject}
          run={run != null ? `${run}` : `0`}
        />
      );
    }

    return ('Could not get pipeline details. Pipeline may have been deleted');
  };

  const getPipelineSummaries = () => {
    if (model?.getArrayData(fieldName).length > 0 && !isLoading) {
      return (
        model.getData(fieldName).map((selectedPipelineId) => {
          return(
            <div key={selectedPipelineId}>
              {getSelectedPipelineSummary(selectedPipelineId)}
            </div>
          );
        })
      );
    }

    return <span>Select a pipeline to get started.</span>;
  };

  const getTextField = (pipeline) => {
    return `${pipeline.name} (${pipeline._id})`;
  };

  const getDisabledPipeline = () => {
    if (isMongoDbId(currentPipelineId) && Array.isArray(pipelines) && pipelines?.length > 0) {
      return pipelines.find((pipeline) => pipeline._id === currentPipelineId);
    }
  };

  if (!isLoading && (!Array.isArray(pipelines) || pipelines.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
        No other Pipelines have been registered. Please go to <Link to="/workflow">Pipelines</Link> and add another pipeline in order to
        configure a child pipeline step.
      </div>
    );
  }

  return (
    <div>
      <MultiSelectInputBase
        fieldName={fieldName}
        selectOptions={pipelines}
        dataObject={model}
        setDataObject={setModel}
        valueField={"_id"}
        textField={isLoading && (!Array.isArray(pipelines) || pipelines.length === 0) ? "_id" : getTextField}
        busy={isLoading}
        disabled={disabled || [getDisabledPipeline()]}
        visible={visible}
        error={error}
        pluralTopic={"Pipelines"}
      />
      {getPipelineSummaries()}
    </div>
  );
}

PipelineMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default PipelineMultiSelectInput;