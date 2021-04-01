import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import Model from "core/data_model/model";
import axios from 'axios';
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function PipelineSelectInput({ visible, fieldName, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const loadPipelines = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getAllPipelinesV2(getAccessToken, cancelSource);
    if (response?.data?.response) {
      let pipelines = response?.data?.response;
      setPipelines(pipelines);
    }
  };

  // TODO: Make pipeline list component with link to pipeline (open in new window)
  const getSelectedPipelineSummary = (selectedPipelineId) => {
    let foundPipeline = pipelines.find(pipeline => pipeline._id === selectedPipelineId);

    if (foundPipeline != null) {
      let pipelineDataObject = new Model({...foundPipeline.pipeline}, pipelineMetadata, false);
      let run = foundPipeline.workflow?.lastRun?.run;
      return (<PipelineSummaryCard pipelineData={pipelineDataObject} run={run != null ? `${run}` : `0`} /> );
    }

    return ('Could not get pipeline details. Pipeline may have been deleted');
  };

  const getPipelineSummaries = () => {
    if (dataObject.getData(fieldName) !== "" && !isLoading) {
      return (
        <div>
          {getSelectedPipelineSummary(dataObject.getData(fieldName))}
        </div>
      );
    }

    return <span>Select a pipeline to get started.</span>;
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
    );
  }

  return (
    // <div>
      <SelectInputBase
        fieldName={fieldName}
        selectOptions={pipelines}
        dataObject={dataObject}
        setDataObject={setDataObject}
        valueField={"_id"}
        textField={(pipeline) => `${pipeline?.name} (${pipeline?._id})`}
        busy={isLoading}
        placeholderText={"Select A Pipeline"}
        disabled={disabled}
      />
      // {getPipelineSummaries()}
    // </div>
  );
}

PipelineSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

export default PipelineSelectInput;